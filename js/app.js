/* TOEIC Prep – logic ứng dụng (vanilla JS, không cần build) */
(function () {
  "use strict";

  const BANK = window.BANK || [];
  const $app = document.getElementById("app");
  const LETTERS = ["A", "B", "C", "D"];

  const PARTS = {
    1: { name: "Part 1 – Mô tả tranh", skill: "L", instr: "Nghe 4 câu mô tả. Chọn câu mô tả đúng nhất bức tranh." },
    2: { name: "Part 2 – Hỏi – Đáp", skill: "L", instr: "Nghe một câu hỏi/câu nói và 3 câu trả lời. Chọn câu trả lời phù hợp nhất." },
    3: { name: "Part 3 – Hội thoại", skill: "L", instr: "Nghe đoạn hội thoại và trả lời 3 câu hỏi." },
    4: { name: "Part 4 – Bài nói ngắn", skill: "L", instr: "Nghe bài nói ngắn và trả lời 3 câu hỏi." },
    5: { name: "Part 5 – Hoàn thành câu", skill: "R", instr: "Chọn từ/cụm từ phù hợp nhất để hoàn thành câu." },
    6: { name: "Part 6 – Hoàn thành đoạn văn", skill: "R", instr: "Chọn đáp án phù hợp nhất cho mỗi chỗ trống trong đoạn văn." },
    7: { name: "Part 7 – Đọc hiểu", skill: "R", instr: "Đọc văn bản và trả lời các câu hỏi." }
  };

  /* ---------------- Storage ---------------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem("toeic:" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("toeic:" + k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  };
  const getWrong = () => store.get("wrong", []);
  function updateWrong(results) {
    const set = new Set(getWrong());
    results.forEach(r => { if (r.correct) set.delete(r.key); else if (r.answered) set.add(r.key); });
    store.set("wrong", [...set]);
    refreshBadge();
  }
  function refreshBadge() { document.getElementById("wrongCount").textContent = getWrong().length; }

  /* ---------------- Helpers ---------------- */
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmtTime = s => { s = Math.max(0, Math.round(s)); const m = Math.floor(s / 60); return String(m).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); };
  const countQ = groups => groups.reduce((n, g) => n + g.questions.length, 0);
  const byPart = p => BANK.filter(g => g.part === p);
  const qKey = (g, i) => g.id + "#" + (g.questions[i] && g.questions[i]._orig !== undefined ? g.questions[i]._orig : i);

  /* ---------------- Text-to-speech ---------------- */
  const tts = {
    rate: store.get("rate", 0.9),
    voices: [],
    load() {
      if (!("speechSynthesis" in window)) return;
      const pick = () => { this.voices = speechSynthesis.getVoices().filter(v => /^en(-|_|$)/i.test(v.lang)); };
      pick();
      speechSynthesis.onvoiceschanged = pick;
    },
    voiceFor(s) {
      const v = this.voices;
      if (!v.length) return null;
      const female = /female|zira|samantha|aria|jenny|susan|victoria|karen|moira|tessa|serena|libby|sonia|hazel|google us english/i;
      const male = /male|david|mark|guy|daniel|alex|fred|george|ryan|tom|google uk english male/i;
      const us = v.filter(x => /en[-_]US/i.test(x.lang));
      const pool = us.length ? us : v;
      if (s === "W") return pool.find(x => female.test(x.name) && !/\bmale\b/i.test(x.name)) || pool[0];
      if (s === "M") return pool.find(x => male.test(x.name) && !/female/i.test(x.name)) || pool[1] || pool[0];
      return v.find(x => /en[-_]GB|en[-_]AU/i.test(x.lang)) || pool[0];
    },
    play(lines, onEnd) {
      if (!("speechSynthesis" in window)) { alert("Trình duyệt không hỗ trợ đọc giọng nói. Hãy dùng Chrome/Edge/Safari bản mới."); return; }
      speechSynthesis.cancel();
      lines.forEach((ln, idx) => {
        const u = new SpeechSynthesisUtterance(ln.t);
        u.lang = "en-US"; u.rate = this.rate;
        const vc = this.voiceFor(ln.s); if (vc) u.voice = vc;
        if (ln.s === "W" && (!vc || vc === this.voiceFor("M"))) u.pitch = 1.3;
        if (ln.s === "M" && (!vc || vc === this.voiceFor("W"))) u.pitch = 0.8;
        if (idx === lines.length - 1 && onEnd) u.onend = onEnd;
        speechSynthesis.speak(u);
      });
    },
    stop() { if ("speechSynthesis" in window) speechSynthesis.cancel(); }
  };
  tts.load();

  function audioLines(g) {
    const lines = (g.script || []).slice();
    const q = g.questions[0];
    if (q.audioOptions) {
      if (g.part === 2) lines.push({ s: "W", t: "" });
      q.o.forEach((o, i) => lines.push({ s: g.part === 2 ? "W" : "N", t: LETTERS[i] + ". " + o }));
    }
    return lines.filter(l => l.t);
  }

  /* ---------------- State ---------------- */
  let S = null;        // phiên làm bài hiện tại
  let timerId = null;
  const settings = Object.assign({ mode: "practice", parts: [1, 2, 3, 4, 5, 6, 7], limit: 30, shuffle: true, minutes: 0 }, store.get("settings", {}));

  /* ---------------- Router ---------------- */
  document.addEventListener("click", e => {
    const n = e.target.closest("[data-nav]");
    if (!n) return;
    e.preventDefault();
    if (S && !S.finished && !confirm("Bạn đang làm bài. Thoát sẽ mất tiến độ. Tiếp tục?")) return;
    stopSession();
    ({ home: renderHome, wrong: renderWrong, history: renderHistory })[n.dataset.nav]();
  });

  function stopSession() { clearInterval(timerId); tts.stop(); S = null; }

  /* ---------------- HOME ---------------- */
  function renderHome() {
    const totalQ = countQ(BANK);
    const hist = store.get("history", []);
    const best = hist.length ? Math.max(...hist.map(h => Math.round(h.correct / h.total * 100))) : 0;
    $app.innerHTML = `
      <section class="card hero">
        <h1>Ôn thi TOEIC Listening & Reading</h1>
        <p>${totalQ} câu hỏi theo đúng 7 Part của đề thi format mới. Mỗi câu đều có giải thích tiếng Việt.</p>
        <div class="stats" style="margin-top:14px">
          <div class="stat"><b>${totalQ}</b><span>Câu hỏi</span></div>
          <div class="stat"><b>${hist.length}</b><span>Lượt đã làm</span></div>
          <div class="stat"><b>${best}%</b><span>Kết quả cao nhất</span></div>
          <div class="stat"><b>${getWrong().length}</b><span>Câu sai cần ôn</span></div>
        </div>
      </section>

      <section class="card">
        <h2>1. Chọn cách làm bài</h2>
        <div class="modes">
          <button class="mode ${settings.mode === "practice" ? "active" : ""}" data-mode="practice">
            <div class="ico">⚡</div><b>Luyện tập – Chấm ngay</b>
            <span>Nhấn đáp án là biết đúng/sai ngay, kèm giải thích chi tiết nếu sai. Phù hợp để học.</span>
          </button>
          <button class="mode ${settings.mode === "exam" ? "active" : ""}" data-mode="exam">
            <div class="ico">⏱️</div><b>Thi thử – Chấm khi nộp bài</b>
            <span>Làm hết đề có tính giờ, nộp bài mới chấm. Xem điểm ước tính & giải thích từng câu.</span>
          </button>
        </div>
      </section>

      <section class="card">
        <h2>2. Chọn phần thi</h2>
        <div class="row" style="margin-bottom:10px">
          <button class="chip" data-preset="all">Tất cả</button>
          <button class="chip" data-preset="L">Chỉ Listening</button>
          <button class="chip" data-preset="R">Chỉ Reading</button>
          <button class="chip" data-preset="5">Chỉ Part 5</button>
        </div>
        <div class="parts">
          ${Object.keys(PARTS).map(p => `
            <label class="part-opt">
              <input type="checkbox" name="part" value="${p}" ${settings.parts.includes(+p) ? "checked" : ""}>
              <div><b>${PARTS[p].name}</b><small>${PARTS[p].skill === "L" ? "🎧 Listening" : "📖 Reading"} · ${countQ(byPart(+p))} câu</small></div>
            </label>`).join("")}
        </div>
        <div class="settings">
          <label>Số câu tối đa
            <select id="limit">
              ${[10, 20, 30, 50, 100, 0].map(n => `<option value="${n}" ${settings.limit === n ? "selected" : ""}>${n ? n + " câu" : "Tất cả"}</option>`).join("")}
            </select>
          </label>
          <label>Thời gian (chế độ thi)
            <select id="minutes">
              <option value="0" ${!settings.minutes ? "selected" : ""}>Tự động (≈ chuẩn TOEIC)</option>
              ${[10, 15, 20, 30, 45, 60, 120].map(n => `<option value="${n}" ${settings.minutes === n ? "selected" : ""}>${n} phút</option>`).join("")}
            </select>
          </label>
          <label>Tốc độ đọc (Listening)
            <select id="rate">
              ${[0.75, 0.85, 0.9, 1, 1.1].map(r => `<option value="${r}" ${tts.rate === r ? "selected" : ""}>${r}x</option>`).join("")}
            </select>
          </label>
          <label class="check"><input type="checkbox" id="shuffle" ${settings.shuffle ? "checked" : ""}> Xáo trộn câu hỏi</label>
        </div>
        <div class="row" style="margin-top:18px">
          <button class="btn primary big" id="start">Bắt đầu làm bài →</button>
          <span class="muted small" id="startInfo"></span>
        </div>
      </section>`;

    const info = () => {
      const parts = [...$app.querySelectorAll("input[name=part]:checked")].map(i => +i.value);
      const lim = +$app.querySelector("#limit").value;
      const total = countQ(BANK.filter(g => parts.includes(g.part)));
      $app.querySelector("#startInfo").textContent = parts.length ? `Sẽ làm khoảng ${lim ? Math.min(lim, total) : total} câu.` : "Hãy chọn ít nhất 1 part.";
    };
    info();
    $app.querySelectorAll("[data-mode]").forEach(b => b.onclick = () => {
      settings.mode = b.dataset.mode;
      $app.querySelectorAll("[data-mode]").forEach(x => x.classList.toggle("active", x === b));
    });
    $app.querySelectorAll("[data-preset]").forEach(b => b.onclick = () => {
      const p = b.dataset.preset;
      $app.querySelectorAll("input[name=part]").forEach(i => {
        const part = +i.value;
        i.checked = p === "all" || PARTS[part].skill === p || String(part) === p;
      });
      info();
    });
    $app.querySelectorAll("input[name=part], #limit").forEach(i => i.onchange = info);
    $app.querySelector("#start").onclick = () => {
      settings.parts = [...$app.querySelectorAll("input[name=part]:checked")].map(i => +i.value);
      settings.limit = +$app.querySelector("#limit").value;
      settings.minutes = +$app.querySelector("#minutes").value;
      settings.shuffle = $app.querySelector("#shuffle").checked;
      tts.rate = +$app.querySelector("#rate").value; store.set("rate", tts.rate);
      if (!settings.parts.length) return alert("Hãy chọn ít nhất 1 part.");
      store.set("settings", settings);
      startSession(buildGroups(settings.parts, settings.limit, settings.shuffle), settings.mode);
    };
  }

  function buildGroups(parts, limit, doShuffle) {
    // Chọn nhóm câu theo tỉ lệ đều giữa các part, giữ nguyên thứ tự Part 1 → 7 như đề thật.
    const pools = {};
    parts.forEach(p => { pools[p] = doShuffle ? shuffle(byPart(p)) : byPart(p); });
    const total = countQ(parts.flatMap(p => pools[p]));
    const target = limit ? Math.min(limit, total) : total;
    const picked = {}; parts.forEach(p => picked[p] = []);
    let n = 0, progress = true;
    while (n < target && progress) {
      progress = false;
      for (const p of parts) {
        if (n >= target) break;
        const g = pools[p].shift();
        if (!g) continue;
        picked[p].push(g); n += g.questions.length; progress = true;
      }
    }
    return parts.slice().sort((a, b) => a - b).flatMap(p => picked[p]);
  }

  /* ---------------- SESSION ---------------- */
  // Xáo thứ tự đáp án để vị trí đáp án đúng phân bố đều A/B/C/D.
  // Ký hiệu (A)/(B)... trong lời giải thích được đổi theo cho khớp.
  // Không xáo câu hỏi chọn vị trí chèn câu ([1]..[4]).
  function shuffleOptions(q) {
    if (q.o.every(o => /^\[\d\]$/.test(o))) return q;
    const perm = shuffle(q.o.map((_, i) => i));      // perm[newIdx] = oldIdx
    const newOf = {}; perm.forEach((old, ni) => { newOf[old] = ni; });
    const e = q.e.replace(/\(([A-D])\)/g, (m, L) => {
      const old = LETTERS.indexOf(L);
      return old < q.o.length ? "(" + LETTERS[newOf[old]] + ")" : m;
    });
    return { ...q, o: perm.map(i => q.o[i]), a: newOf[q.a], e };
  }

  function startSession(groups, mode, label) {
    stopSession();
    if (!groups.length) { alert("Không có câu hỏi nào."); return; }
    groups = groups.map(g => ({ ...g, questions: g.questions.map(q => shuffleOptions(q._base || q)).map((q, i) => ({ ...q, _base: g.questions[i]._base || g.questions[i] })) }));
    const flat = [];
    groups.forEach((g, gi) => g.questions.forEach((q, qi) => flat.push({ g, gi, qi, q, key: qKey(g, qi), num: flat.length + 1 })));
    let seconds = 0;
    if (mode === "exam") {
      seconds = settings.minutes ? settings.minutes * 60
        : Math.ceil(flat.reduce((t, f) => t + (PARTS[f.g.part].skill === "L" ? 35 : 45), 0) / 60) * 60; // ≈ 200 câu / 120 phút
    }
    S = { mode, groups, flat, answers: {}, cur: 0, finished: false, seconds, left: seconds, start: Date.now(), label: label || "" };
    if (mode === "exam") {
      timerId = setInterval(() => {
        S.left = S.seconds - (Date.now() - S.start) / 1000;
        const el = document.getElementById("timer");
        if (el) { el.textContent = fmtTime(S.left); el.classList.toggle("low", S.left < 60); }
        if (S.left <= 0) { clearInterval(timerId); alert("Hết giờ! Bài làm sẽ được nộp tự động."); finish(); }
      }, 500);
    }
    renderQuiz();
  }

  function renderQuiz() {
    tts.stop();
    const g = S.groups[S.cur];
    const exam = S.mode === "exam";
    const answeredN = Object.keys(S.answers).length;
    const P = PARTS[g.part];
    const first = S.flat.find(f => f.gi === S.cur).num;
    const revealed = !exam && g.questions.every((_, i) => S.answers[qKey(g, i)] !== undefined);
    const isLast = S.cur === S.groups.length - 1;

    $app.innerHTML = `
      <div class="quizbar">
        <span class="tag ${exam ? "exam" : ""}">${exam ? "⏱️ Thi thử" : "⚡ Luyện tập"}</span>
        <div class="progress small">Đã làm ${answeredN}/${S.flat.length} câu${S.label ? " · " + esc(S.label) : ""}
          <div class="bar"><i style="width:${answeredN / S.flat.length * 100}%"></i></div></div>
        ${exam ? `<span class="timer" id="timer">${fmtTime(S.left)}</span>
                  <button class="btn primary" id="submit">Nộp bài</button>` :
                 `<button class="btn" id="submit">Kết thúc</button>`}
      </div>

      <section class="card">
        <span class="tag">${P.skill === "L" ? "🎧" : "📖"} ${P.name}</span>
        <div class="instr">${P.instr}</div>
        ${g.scene ? `<div class="scene"><div class="icon">${g.scene.icon}</div><div class="desc">${esc(g.scene.desc)}</div></div>` : ""}
        ${P.skill === "L" ? `<div class="audio">
            <button class="btn primary" id="play">▶ Nghe</button>
            <button class="btn ghost" id="stop">■ Dừng</button>
            <span class="muted small">Có thể nghe lại nhiều lần. Phím tắt: <kbd>Space</kbd></span>
          </div>` : ""}
        <div id="transcript"></div>
        ${g.passage ? `<div class="passage">${g.passage}</div>` : ""}
        <div id="qs">${g.questions.map((q, i) => renderQuestion(g, i, first + i)).join("")}</div>
        <div class="navrow">
          <button class="btn" id="prev" ${S.cur === 0 ? "disabled" : ""}>← Trước</button>
          ${isLast ? `<button class="btn primary" id="end">${exam ? "Nộp bài" : "Xem kết quả"}</button>`
                   : `<button class="btn ${revealed ? "primary" : ""}" id="next">Tiếp →</button>`}
        </div>
      </section>

      <section class="card">
        <h2 class="small" style="margin-bottom:8px">Danh sách câu hỏi</h2>
        <div class="palette">${S.flat.map(f => {
          const a = S.answers[f.key];
          let cls = "";
          if (a !== undefined) cls = exam ? "done" : (a === f.q.a ? "ok" : "bad");
          if (f.gi === S.cur) cls += " cur";
          return `<button class="${cls}" data-jump="${f.gi}">${f.num}</button>`;
        }).join("")}</div>
      </section>`;

    renderTranscript();
    const $ = s => $app.querySelector(s);
    $("#submit").onclick = () => finish(true);
    if ($("#prev")) $("#prev").onclick = () => go(S.cur - 1);
    if ($("#next")) $("#next").onclick = () => go(S.cur + 1);
    if ($("#end")) $("#end").onclick = () => finish(true);
    if ($("#play")) $("#play").onclick = () => tts.play(audioLines(g));
    if ($("#stop")) $("#stop").onclick = () => tts.stop();
    $app.querySelectorAll("[data-jump]").forEach(b => b.onclick = () => go(+b.dataset.jump));
    $app.querySelectorAll("[data-opt]").forEach(b => b.onclick = () => choose(g, +b.dataset.q, +b.dataset.opt));
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (P.skill === "L" && !revealed) setTimeout(() => S && S.groups[S.cur] === g && tts.play(audioLines(g)), 350);
  }

  function renderTranscript() {
    const g = S.groups[S.cur];
    const el = document.getElementById("transcript");
    if (!el || !g.script) return;
    const show = S.mode !== "exam" && g.questions.every((_, i) => S.answers[qKey(g, i)] !== undefined);
    el.innerHTML = show && g.script.length ? transcriptHTML(g) : "";
  }
  function transcriptHTML(g) {
    if (!g.script || !g.script.length) return "";
    const who = { M: "Man", W: "Woman", N: "Narrator" };
    return `<div class="transcript"><b class="small">📝 Transcript</b>${g.script.map(l => `<p><b>${who[l.s]}:</b> ${esc(l.t)}</p>`).join("")}</div>`;
  }

  function renderQuestion(g, i, num) {
    const q = g.questions[i];
    const key = qKey(g, i);
    const a = S.answers[key];
    const exam = S.mode === "exam";
    const reveal = !exam && a !== undefined;
    const showText = !q.hideText || reveal;
    const qtext = q.hideText ? (reveal ? esc(q.q) : "<i class='muted'>(Nghe câu hỏi và chọn đáp án)</i>") : esc(q.q);
    const opts = q.o.map((o, j) => {
      let cls = "";
      if (reveal) { if (j === q.a) cls = "correct"; else if (j === a) cls = "wrong"; }
      else if (a === j) cls = "sel";
      const txt = q.audioOptions && !showText ? "" : esc(o);
      return `<button class="opt ${cls}" data-q="${i}" data-opt="${j}" ${reveal ? "disabled" : ""}><span class="L">(${LETTERS[j]})</span><span>${txt}</span></button>`;
    }).join("");
    const exp = reveal ? `<div class="explain ${a === q.a ? "ok" : "bad"}">
        <b>${a === q.a ? "✅ Chính xác!" : `❌ Sai rồi – Đáp án đúng: (${LETTERS[q.a]}) ${esc(q.o[q.a])}`}</b>${esc(q.e)}</div>` : "";
    return `<div class="q"><div class="qtext"><span class="qnum">${num}.</span>${qtext}</div><div class="opts">${opts}</div>${exp}</div>`;
  }

  function choose(g, i, j) {
    const key = qKey(g, i);
    if (S.mode !== "exam" && S.answers[key] !== undefined) return;
    S.answers[key] = j;
    if (S.mode !== "exam") tts.stop();
    const scrollY = window.scrollY;
    renderQuiz();
    window.scrollTo(0, scrollY);
  }

  function go(i) { if (i < 0 || i >= S.groups.length) return; S.cur = i; renderQuiz(); }

  /* ---------------- FINISH / RESULT ---------------- */
  function finish(ask) {
    if (!S || S.finished) return;
    const missing = S.flat.length - Object.keys(S.answers).length;
    if (ask) {
      const msg = S.mode === "exam"
        ? (missing ? `Bạn còn ${missing} câu chưa làm. Vẫn nộp bài?` : "Nộp bài và chấm điểm?")
        : (missing ? `Còn ${missing} câu chưa làm. Kết thúc và xem kết quả?` : null);
      if (msg && !confirm(msg)) return;
    }
    clearInterval(timerId); tts.stop();
    S.finished = true;
    const results = S.flat.map(f => {
      const a = S.answers[f.key];
      return { ...f, user: a, answered: a !== undefined, correct: a === f.q.a };
    });
    updateWrong(results);
    const correct = results.filter(r => r.correct).length;
    const hist = store.get("history", []);
    hist.unshift({ date: Date.now(), mode: S.mode, correct, total: results.length, time: Math.round((Date.now() - S.start) / 1000), parts: [...new Set(S.groups.map(g => g.part))] });
    store.set("history", hist.slice(0, 100));
    renderResult(results);
  }

  function estimate(results, skill) {
    const rs = results.filter(r => PARTS[r.g.part].skill === skill);
    if (!rs.length) return null;
    const ratio = rs.filter(r => r.correct).length / rs.length;
    return Math.min(495, Math.max(5, Math.round((5 + ratio * 490) / 5) * 5));
  }

  function renderResult(results) {
    const total = results.length, correct = results.filter(r => r.correct).length;
    const pct = Math.round(correct / total * 100);
    const L = estimate(results, "L"), R = estimate(results, "R");
    const color = pct >= 80 ? "var(--ok)" : pct >= 50 ? "var(--warn)" : "var(--bad)";
    const partRows = [...new Set(results.map(r => r.g.part))].sort().map(p => {
      const rs = results.filter(r => r.g.part === p), c = rs.filter(r => r.correct).length;
      return `<tr><td>${PARTS[p].name}</td><td>${c}/${rs.length}</td><td>${Math.round(c / rs.length * 100)}%</td></tr>`;
    }).join("");
    const elapsed = Math.round((Date.now() - S.start) / 1000);
    const msg = pct >= 85 ? "Xuất sắc! Bạn đã sẵn sàng cho mức điểm cao." : pct >= 65 ? "Khá tốt! Ôn lại các câu sai để tiến bộ thêm." : pct >= 40 ? "Cần cố gắng thêm. Hãy đọc kỹ giải thích bên dưới." : "Đừng nản! Luyện chế độ 'Chấm ngay' để học từng câu.";

    $app.innerHTML = `
      <section class="card">
        <h1>Kết quả ${S.mode === "exam" ? "thi thử" : "luyện tập"}</h1>
        <div class="scorebox">
          <div class="ring" style="background:conic-gradient(${color} ${pct * 3.6}deg, var(--line) 0)"><div>${pct}%</div></div>
          <div>
            <div class="score-big">${correct}<span class="muted" style="font-size:24px">/${total}</span></div>
            <div class="muted">câu đúng · thời gian ${fmtTime(elapsed)}</div>
            <p style="margin:8px 0 0">${msg}</p>
          </div>
        </div>
        ${(L || R) ? `<div class="stats" style="margin-top:16px">
          ${L ? `<div class="stat"><b>${L}</b><span>Listening (ước tính /495)</span></div>` : ""}
          ${R ? `<div class="stat"><b>${R}</b><span>Reading (ước tính /495)</span></div>` : ""}
          ${L && R ? `<div class="stat"><b>${L + R}</b><span>Tổng (ước tính /990)</span></div>` : ""}
        </div><p class="muted small">* Điểm quy đổi chỉ mang tính tham khảo, dựa trên tỉ lệ câu đúng.</p>` : ""}
        <table style="margin-top:10px"><tr><th>Phần</th><th>Đúng</th><th>Tỉ lệ</th></tr>${partRows}</table>
        <div class="row" style="margin-top:16px">
          <button class="btn primary" id="again">Làm lại đề này</button>
          ${results.some(r => !r.correct) ? `<button class="btn" id="retryWrong">Luyện lại câu sai (${results.filter(r => !r.correct).length})</button>` : ""}
          <button class="btn" data-nav="home">Về trang chủ</button>
        </div>
      </section>

      <section class="card">
        <div class="row" style="justify-content:space-between;margin-bottom:12px">
          <h2 style="margin:0">Xem lại & giải thích</h2>
          <div class="row">
            <button class="chip" data-filter="all">Tất cả</button>
            <button class="chip" data-filter="bad">Chỉ câu sai/bỏ trống</button>
          </div>
        </div>
        <div id="review"></div>
      </section>`;

    const groupsSnapshot = S.groups, mode = S.mode;
    const renderReview = onlyBad => {
      let html = "", lastG = null;
      results.forEach(r => {
        if (onlyBad && r.correct) return;
        let ctx = "";
        if (r.g !== lastG) {
          if (r.g.passage) ctx += `<details><summary>Xem đoạn văn</summary><div class="passage" style="margin-top:8px">${r.g.passage}</div></details>`;
          if (r.g.scene) ctx += `<div class="muted small">🖼️ ${r.g.scene.icon} ${esc(r.g.scene.desc)}</div>`;
          if (r.g.script && r.g.script.length) ctx += `<details><summary>Xem transcript</summary>${transcriptHTML(r.g)}</details>`;
          lastG = r.g;
        }
        const cls = r.correct ? "ok" : r.answered ? "bad" : "skip";
        html += `<div class="review-item ${cls}">
          <div class="small muted">${PARTS[r.g.part].name}</div>${ctx}
          <div class="qtext" style="margin-top:6px"><span class="qnum">${r.num}.</span>${esc(r.q.q)}</div>
          <div class="opts">${r.q.o.map((o, j) => `<div class="opt ${j === r.q.a ? "correct" : j === r.user ? "wrong" : ""}"><span class="L">(${LETTERS[j]})</span><span>${esc(o)}${j === r.user ? " &nbsp;← <i>bạn chọn</i>" : ""}</span></div>`).join("")}</div>
          <div class="explain ${r.correct ? "ok" : "bad"}"><b>${r.correct ? "✅ Đúng" : r.answered ? `❌ Sai – Đáp án: (${LETTERS[r.q.a]})` : `⚠️ Chưa trả lời – Đáp án: (${LETTERS[r.q.a]})`}</b>${esc(r.q.e)}</div>
        </div>`;
      });
      document.getElementById("review").innerHTML = html || `<div class="empty">🎉 Không có câu sai nào!</div>`;
    };
    renderReview(mode === "exam" ? false : true);
    $app.querySelectorAll("[data-filter]").forEach(b => b.onclick = () => renderReview(b.dataset.filter === "bad"));
    $app.querySelector("#again").onclick = () => startSession(groupsSnapshot, mode);
    const rw = $app.querySelector("#retryWrong");
    if (rw) rw.onclick = () => startSession(groupsFromKeys(results.filter(r => !r.correct).map(r => r.key)), "practice", "Luyện câu sai");
    window.scrollTo({ top: 0 });
  }

  // Tạo các nhóm câu hỏi con từ danh sách key (chỉ giữ những câu cần ôn, vẫn kèm đoạn văn/audio).
  // _orig giữ chỉ số gốc để key (dùng cho danh sách câu sai) vẫn chính xác.
  function groupsFromKeys(keys) {
    const want = {};
    keys.forEach(k => { const [gid, i] = k.split("#"); (want[gid] = want[gid] || []).push(+i); });
    return BANK.filter(g => want[g.id]).sort((a, b) => a.part - b.part).map(g => ({
      ...g,
      questions: [...new Set(want[g.id])].filter(i => g.questions[i]).sort((a, b) => a - b)
        .map(i => ({ ...g.questions[i], _orig: i }))
    })).filter(g => g.questions.length);
  }

  /* ---------------- WRONG LIST ---------------- */
  function renderWrong() {
    const keys = getWrong();
    $app.innerHTML = `<section class="card">
      <h1>Câu sai cần ôn</h1>
      <p class="muted">Những câu bạn làm sai sẽ được lưu ở đây. Làm đúng lại thì câu đó sẽ tự động được xóa khỏi danh sách.</p>
      ${keys.length ? `<div class="row"><button class="btn primary big" id="go">Luyện ${keys.length} câu sai (chấm ngay)</button>
        <button class="btn" id="goExam">Thi lại dạng đề</button>
        <button class="btn ghost" id="clear">Xóa danh sách</button></div>`
        : `<div class="empty">Chưa có câu sai nào. Hãy làm bài để hệ thống ghi nhận nhé!</div>`}
    </section>`;
    if (!keys.length) return;
    $app.querySelector("#go").onclick = () => startSession(groupsFromKeys(keys), "practice", "Ôn câu sai");
    $app.querySelector("#goExam").onclick = () => startSession(groupsFromKeys(keys), "exam", "Thi lại câu sai");
    $app.querySelector("#clear").onclick = () => { if (confirm("Xóa toàn bộ danh sách câu sai?")) { store.set("wrong", []); refreshBadge(); renderWrong(); } };
  }

  /* ---------------- HISTORY ---------------- */
  function renderHistory() {
    const h = store.get("history", []);
    $app.innerHTML = `<section class="card">
      <h1>Lịch sử làm bài</h1>
      ${h.length ? `<table><tr><th>Thời điểm</th><th>Chế độ</th><th>Part</th><th>Kết quả</th><th>Thời gian</th></tr>
        ${h.map(x => `<tr><td>${new Date(x.date).toLocaleString("vi-VN")}</td><td>${x.mode === "exam" ? "⏱️ Thi thử" : "⚡ Luyện tập"}</td>
          <td>${(x.parts || []).join(", ")}</td><td><b>${x.correct}/${x.total}</b> (${Math.round(x.correct / x.total * 100)}%)</td><td>${fmtTime(x.time)}</td></tr>`).join("")}
        </table><div class="row" style="margin-top:14px"><button class="btn ghost" id="clr">Xóa lịch sử</button></div>`
        : `<div class="empty">Chưa có lượt làm bài nào.</div>`}
    </section>`;
    const c = $app.querySelector("#clr");
    if (c) c.onclick = () => { if (confirm("Xóa lịch sử?")) { store.set("history", []); renderHistory(); } };
  }

  /* ---------------- Keyboard ---------------- */
  document.addEventListener("keydown", e => {
    if (!S || S.finished || /input|select|textarea/i.test(e.target.tagName)) return;
    if (e.key === "ArrowRight") go(S.cur + 1);
    else if (e.key === "ArrowLeft") go(S.cur - 1);
    else if (e.key === " " && PARTS[S.groups[S.cur].part].skill === "L") { e.preventDefault(); tts.play(audioLines(S.groups[S.cur])); }
    else if (/^[a-d1-4]$/i.test(e.key) && S.groups[S.cur].questions.length === 1) {
      const j = /\d/.test(e.key) ? +e.key - 1 : e.key.toLowerCase().charCodeAt(0) - 97;
      if (j < S.groups[S.cur].questions[0].o.length) choose(S.groups[S.cur], 0, j);
    }
  });

  refreshBadge();
  renderHome();
})();
