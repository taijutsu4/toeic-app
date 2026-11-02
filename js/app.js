/* TOEIC Prep – logic ứng dụng (vanilla JS, không cần build) */
(function () {
  "use strict";

  const BANK = window.BANK || [];
  const $app = document.getElementById("app");
  const LETTERS = ["A", "B", "C", "D"];
  const asset = p => (window.ASSETS && window.ASSETS[p]) || p;   // build 1 file: ảnh nhúng base64

  const PARTS = {
    1: { name: "Part 1 – Mô tả tranh", skill: "L", instr: "Nhìn ảnh, nghe 4 câu mô tả (không in trong đề). Chọn câu mô tả đúng nhất." },
    2: { name: "Part 2 – Hỏi – Đáp", skill: "L", instr: "Nghe một câu hỏi/câu nói và 3 câu trả lời (không in trong đề). Chọn câu trả lời phù hợp nhất." },
    3: { name: "Part 3 – Hội thoại", skill: "L", instr: "Nghe đoạn hội thoại (2–3 người) rồi trả lời 3 câu hỏi in trong đề." },
    4: { name: "Part 4 – Bài nói ngắn", skill: "L", instr: "Nghe bài nói của một người rồi trả lời 3 câu hỏi in trong đề." },
    5: { name: "Part 5 – Hoàn thành câu", skill: "R", instr: "Chọn từ/cụm từ phù hợp nhất để hoàn thành câu." },
    6: { name: "Part 6 – Hoàn thành đoạn văn", skill: "R", instr: "Chọn đáp án phù hợp nhất cho mỗi chỗ trống trong đoạn văn." },
    7: { name: "Part 7 – Đọc hiểu", skill: "R", instr: "Đọc văn bản và trả lời các câu hỏi." }
  };
  const isL = g => PARTS[g.part].skill === "L";

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
  const hash = s => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };

  // Tách câu để đọc lần lượt; không tách sau chữ viết tắt (Mr., Dr., A.M.), chữ cái đơn (A.) hay số (7.)
  function splitSentences(text) {
    const out = [];
    let cur = "";
    const parts = text.split(/(?<=[.!?]["']?)\s+/);
    parts.forEach(w => {
      cur = cur ? cur + " " + w : w;
      const last = cur.split(/\s+/).pop();
      const abbr = /^(Mr|Ms|Mrs|Dr|St|No|[A-Z]|\d+|[A-Z]\.[A-Z])\.$/.test(last);
      if (!abbr) { out.push(cur); cur = ""; }
    });
    if (cur) out.push(cur);
    return out.filter(Boolean);
  }

  /* ---------------- Text-to-speech ----------------
   * Đề thật dùng 4 giọng: Mỹ, Anh, Canada, Úc. Ở đây mỗi nhóm câu được gán giọng theo vùng
   * (nếu thiết bị có), nam/nữ đúng vai, và đọc lần lượt từng câu (tránh lỗi Chrome cắt câu dài). */
  const ACCENTS = ["en-US", "en-GB", "en-AU", "en-CA"];
  const FEMALE = /female|woman|zira|samantha|aria|jenny|susan|victoria|karen|moira|tessa|serena|libby|sonia|hazel|natasha|clara|emma|ava|allison|michelle|nicole|kate|catherine|fiona|veena|joanna|salli|kimberly|ivy|amy|olivia|google us english$|google uk english female/i;
  const MALE = /\bmale\b|\bman\b|david|mark|guy|daniel|alex|fred|george|ryan|tom|thomas|william|james|liam|christopher|eric|brian|matthew|justin|joey|arthur|oliver|google uk english male/i;
  const tts = {
    rate: store.get("rate", 0.9),
    voices: [],
    token: 0,
    keep: [],
    supported: "speechSynthesis" in window,
    load() {
      if (!this.supported) return;
      const pick = () => { this.voices = speechSynthesis.getVoices().filter(v => /^en([-_]|$)/i.test(v.lang)); };
      pick();
      speechSynthesis.onvoiceschanged = pick;
    },
    gender(v) { return MALE.test(v.name) && !/female/i.test(v.name) ? "M" : FEMALE.test(v.name) ? "W" : "?"; },
    // Chọn giọng cho một "vai" trong một nhóm câu. Các vai khác nhau cố gắng dùng giọng khác nhau.
    cast(roles, seed) {
      const map = {}, used = new Set();
      const v = this.voices;
      roles.forEach((role, i) => {
        const g = role.gender;
        const acc = ACCENTS[(seed + i) % ACCENTS.length];
        const tiers = [
          x => x.lang.replace("_", "-") === acc && this.gender(x) === g,
          x => this.gender(x) === g,
          x => x.lang.replace("_", "-") === acc && this.gender(x) === "?",
          x => this.gender(x) === "?",
          () => true
        ];
        let voice = null;
        for (const t of tiers) {
          const c = v.filter(t);
          voice = c.find(x => !used.has(x)) || null;
          if (voice) break;
        }
        if (!voice) voice = v.filter(x => this.gender(x) === g)[0] || v[0] || null;
        if (voice) used.add(voice);
        // Nếu không tìm được giọng đúng giới tính → chỉnh cao độ cho dễ phân biệt
        const pitch = voice && this.gender(voice) === g ? 1 : (g === "W" ? 1.35 : 0.75);
        map[role.key] = { voice, pitch: pitch * (role.alt ? (g === "W" ? 1.08 : 0.92) : 1) };
      });
      return map;
    },
    // items: [{s, t}] hoặc {pause: ms}; cast: map vai → {voice, pitch}
    play(items, cast, onEnd) {
      if (!this.supported) { if (onEnd) setTimeout(onEnd, 300); return false; }
      this.stop();
      const my = ++this.token;
      // tách thành từng câu
      const seq = [];
      items.forEach(it => {
        if (it.pause) { seq.push(it); return; }
        splitSentences(it.t).forEach(t => seq.push({ s: it.s, t }));
      });
      let i = 0;
      const next = () => {
        if (my !== this.token) return;
        if (i >= seq.length) { if (onEnd) onEnd(); return; }
        const it = seq[i++];
        if (it.pause) { setTimeout(next, it.pause); return; }
        const u = new SpeechSynthesisUtterance(it.t);
        const c = cast[it.s] || cast.N || {};
        u.lang = c.voice ? c.voice.lang : "en-US";
        if (c.voice) u.voice = c.voice;
        u.pitch = c.pitch || 1;
        u.rate = this.rate;
        let done = false;
        const fin = () => { if (done) return; done = true; setTimeout(next, 120); };
        u.onend = fin; u.onerror = fin;
        // phòng trường hợp trình duyệt không gọi onend
        setTimeout(() => { if (!done && my === this.token && !speechSynthesis.speaking) fin(); }, 4000 + it.t.length * 120 / this.rate);
        this.keep = [u];                        // giữ tham chiếu (bug GC của Chrome)
        speechSynthesis.speak(u);
      };
      next();
      return true;
    },
    stop() { this.token++; if (this.supported) speechSynthesis.cancel(); }
  };
  tts.load();

  /* Kịch bản phát âm thanh của 1 nhóm câu.
   * sim = mô phỏng thi thật: có người dẫn đọc số câu, đọc lại câu hỏi Part 3/4 và chừa thời gian trả lời. */
  function buildAudio(g, firstNum, sim) {
    const seed = hash(g.id);
    const items = [];
    let roles;
    const q0 = g.questions[0];
    if (g.part === 1) {
      const rg = seed % 2 ? "M" : "W";
      roles = [{ key: "N", gender: "M" }, { key: "R", gender: rg }];
      if (sim) items.push({ s: "N", t: `Number ${firstNum}. Look at the picture marked number ${firstNum} in your test book.` }, { pause: 600 });
      q0.o.forEach((o, i) => items.push({ s: "R", t: `${LETTERS[i]}. ${o}` }, { pause: 900 }));
      if (sim) items.push({ pause: 5000 });
    } else if (g.part === 2) {
      const qg = seed % 2 ? "M" : "W";
      roles = [{ key: "N", gender: "M" }, { key: "Q", gender: qg }, { key: "R", gender: qg === "M" ? "W" : "M" }];
      if (sim) items.push({ s: "N", t: `Number ${firstNum}.` }, { pause: 400 });
      items.push(...g.script, { pause: 900 });
      q0.o.forEach((o, i) => items.push({ s: "R", t: `${LETTERS[i]}. ${o}` }, { pause: 800 }));
      if (sim) items.push({ pause: 5000 });
    } else {
      const sp = [...new Set(g.script.map(l => l.s))];
      roles = [{ key: "N", gender: "M" }].concat(sp.map(s => ({ key: s, gender: s[0], alt: s.length > 1 })));
      const last = firstNum + g.questions.length - 1;
      const kind = g.part === 3 ? (g.speakers === 3 ? "conversation with three speakers" : "conversation") : "talk";
      if (sim) items.push({ s: "N", t: `Questions ${firstNum} through ${last} refer to the following ${kind}${g.graphic ? " and graphic" : ""}.` }, { pause: 700 });
      g.script.forEach(l => items.push(l, { pause: 350 }));
      if (sim) g.questions.forEach((q, i) => items.push({ pause: 900 }, { s: "N", t: `${firstNum + i}. ${q.q}` }, { pause: q.q.startsWith("Look at the graphic") ? 12000 : 8000 }));
    }
    return { items, cast: tts.cast(roles, seed) };
  }

  /* ---------------- State ---------------- */
  let S = null;        // phiên làm bài hiện tại
  let timerId = null;
  const settings = Object.assign({ mode: "practice", parts: [1, 2, 3, 4, 5, 6, 7], limit: 30, shuffle: true, minutes: 0, sim: true }, store.get("settings", {}));

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
        <p>${totalQ} câu tự biên soạn theo format TOEIC Listening &amp; Reading từ 2019. Mỗi câu có giải thích tiếng Việt, kể cả khi bạn chọn đúng. Đề đầy đủ được xáo mới mỗi lần, đúng số câu và dạng câu của đề thật.</p>
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
            <span>Nhấn đáp án là biết đúng/sai ngay, kèm giải thích chi tiết và transcript. Nghe lại thoải mái.</span>
          </button>
          <button class="mode ${settings.mode === "exam" ? "active" : ""}" data-mode="exam">
            <div class="ico">⏱️</div><b>Thi thử – Chấm khi nộp bài</b>
            <span>Làm hết đề có tính giờ, nộp bài mới chấm. Xem điểm ước tính & giải thích từng câu.</span>
          </button>
        </div>
        <label class="check sim-opt" style="margin-top:12px"><input type="checkbox" id="sim" ${settings.sim ? "checked" : ""}>
          <span><b>Mô phỏng phần nghe như thi thật</b> (chế độ thi thử): mỗi đoạn chỉ phát <b>1 lần</b>, có người dẫn đọc số câu và đọc câu hỏi,
          chừa 5 giây (Part 1–2) / 8 giây mỗi câu (Part 3–4) rồi <b>tự chuyển</b>, không quay lại được.</span></label>
      </section>

      <section class="card">
        <h2>Đề đầy đủ 200 câu</h2>
        <p>Mỗi lần bấm sẽ rút một đề mới từ ngân hàng: đúng 7 part, cân bằng dạng câu Part 2 và Part 5, có hội thoại 3 người, câu hàm ý, biểu đồ, đoạn đơn / đôi / ba ở Part 7. Ảnh Part 1 là ảnh giấy phép tự do. Phần nghe đọc bằng giọng của trình duyệt từ lời thoại gốc, không phải băng đề thật.</p>
        <div class="blueprint">
          <span>Part 1 · 6</span><span>Part 2 · 25</span><span>Part 3 · 39</span><span>Part 4 · 30</span>
          <span>Part 5 · 30</span><span>Part 6 · 16</span><span>Part 7 · 54</span>
        </div>
        <button class="btn primary big" id="fullStart">Làm đề đầy đủ 200 câu →</button>
        <p class="muted small" style="margin:10px 0 0">Dùng cách làm bài phía trên. Luyện tập hiện giải thích ngay khi chọn đáp án. Thi thử tính 120 phút nếu bạn để thời gian ở chế độ tự động.</p>
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
        <div class="row" style="margin-top:12px">
          <button class="btn ghost small" id="testVoice">🔊 Thử giọng đọc</button>
          <span class="muted small" id="voiceInfo"></span>
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
    const voiceInfo = () => {
      const el = $app.querySelector("#voiceInfo"); if (!el) return;
      if (!tts.supported) { el.textContent = "⚠️ Trình duyệt không hỗ trợ đọc giọng nói – phần Listening sẽ không có âm thanh."; return; }
      const accs = [...new Set(tts.voices.map(v => v.lang.replace("_", "-")))].filter(l => ACCENTS.includes(l));
      const names = { "en-US": "Mỹ", "en-GB": "Anh", "en-AU": "Úc", "en-CA": "Canada" };
      el.textContent = tts.voices.length ? `Thiết bị có ${tts.voices.length} giọng tiếng Anh` + (accs.length ? ` (${accs.map(a => names[a]).join(", ")})` : "") + "." : "Đang tải giọng đọc…";
    };
    voiceInfo(); setTimeout(voiceInfo, 800);
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
    $app.querySelector("#testVoice").onclick = () => {
      tts.rate = +$app.querySelector("#rate").value;
      const roles = [{ key: "W", gender: "W" }, { key: "M", gender: "M" }];
      tts.play([{ s: "W", t: "Hello. Welcome to your TOEIC practice test." }, { s: "M", t: "Let's get started." }], tts.cast(roles, Math.floor(Math.random() * 4)));
    };
    $app.querySelector("#start").onclick = () => {
      settings.parts = [...$app.querySelectorAll("input[name=part]:checked")].map(i => +i.value);
      settings.limit = +$app.querySelector("#limit").value;
      settings.minutes = +$app.querySelector("#minutes").value;
      settings.shuffle = $app.querySelector("#shuffle").checked;
      settings.sim = $app.querySelector("#sim").checked;
      tts.rate = +$app.querySelector("#rate").value; store.set("rate", tts.rate);
      if (!settings.parts.length) return alert("Hãy chọn ít nhất 1 part.");
      store.set("settings", settings);
      startSession(buildGroups(settings.parts, settings.limit, settings.shuffle), settings.mode);
    };
    $app.querySelector("#fullStart").onclick = startFull;
  }

  function startFull() {
    const modeBtn = $app.querySelector(".mode.active");
    if (modeBtn) settings.mode = modeBtn.dataset.mode;
    const sim = $app.querySelector("#sim");
    if (sim) settings.sim = sim.checked;
    const minutes = $app.querySelector("#minutes");
    if (minutes) settings.minutes = +minutes.value;
    const shuffleBox = $app.querySelector("#shuffle");
    if (shuffleBox) settings.shuffle = shuffleBox.checked;
    const rate = $app.querySelector("#rate");
    if (rate) { tts.rate = +rate.value; store.set("rate", tts.rate); }
    store.set("settings", settings);
    if (typeof buildOfficialExam !== "function") { alert("Không tải được bộ ghép đề."); return; }
    const paper = buildOfficialExam(BANK, settings.shuffle !== false);
    if (!paper || paper.stats.total !== 200) {
      alert("Ngân hàng chưa ghép đủ 200 câu. Hãy tải lại trang.");
      return;
    }
    startSession(paper.groups, settings.mode, "Đề đầy đủ 200 câu", { minutes: settings.minutes || 120 });
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

  function startSession(groups, mode, label, opts) {
    stopSession();
    if (!groups.length) { alert("Không có câu hỏi nào."); return; }
    groups = groups.map(g => ({ ...g, questions: g.questions.map(q => shuffleOptions(q._base || q)).map((q, i) => ({ ...q, _base: g.questions[i]._base || g.questions[i] })) }));
    const flat = [];
    groups.forEach((g, gi) => g.questions.forEach((q, qi) => flat.push({ g, gi, qi, q, key: qKey(g, qi), num: flat.length + 1 })));
    let seconds = 0;
    if (mode === "exam") {
      // Đề đủ 200 câu: 120 phút. Đề rút gọn: Listening ≈ 30 giây/câu, Reading ≈ 45 giây/câu.
      seconds = settings.minutes ? settings.minutes * 60
        : (opts && opts.minutes ? opts.minutes * 60
        : Math.ceil(flat.reduce((t, f) => t + (isL(f.g) ? 30 : 45), 0) / 60) * 60);
    }
    const sim = mode === "exam" && settings.sim && tts.supported;
    S = { mode, sim, groups, flat, answers: {}, cur: 0, finished: false, seconds, left: seconds, start: Date.now(), label: label || "", heard: {} };
    if (mode === "exam") {
      timerId = setInterval(() => {
        S.left = S.seconds - (Date.now() - S.start) / 1000;
        const el = document.getElementById("timer");
        if (el) { el.textContent = fmtTime(S.left); el.classList.toggle("low", S.left < 60); }
        if (S.left <= 0) { clearInterval(timerId); alert("Hết giờ! Bài làm sẽ được nộp tự động."); finish(); }
      }, 500);
    }
    go(0);
  }

  const firstNum = gi => S.flat.find(f => f.gi === gi).num;
  // Trong chế độ mô phỏng: không được quay lại/nhảy tới các nhóm Listening khác
  const canGoTo = gi => !S.sim || (!isL(S.groups[gi]) && !isL(S.groups[S.cur])) || gi === S.cur;

  function playCurrent() {
    const g = S.groups[S.cur];
    if (!isL(g)) return;
    const gi = S.cur;
    const { items, cast } = buildAudio(g, firstNum(gi), S.sim);
    const status = document.getElementById("audioStatus");
    if (status) status.textContent = "🔊 Đang phát…";
    tts.play(items, cast, () => {
      if (!S || S.cur !== gi || S.finished) return;
      S.heard[gi] = true;
      if (S.sim) {
        if (gi < S.groups.length - 1) go(gi + 1); else finish(false);
      } else {
        const st = document.getElementById("audioStatus");
        if (st) st.textContent = "✔ Đã phát xong";
      }
    });
  }

  function renderQuiz() {
    const g = S.groups[S.cur];
    const exam = S.mode === "exam";
    const answeredN = Object.keys(S.answers).length;
    const P = PARTS[g.part];
    const first = firstNum(S.cur);
    const revealed = !exam && g.questions.every((_, i) => S.answers[qKey(g, i)] !== undefined);
    const isLast = S.cur === S.groups.length - 1;
    const lockNav = S.sim && isL(g);
    const nextLocked = lockNav;            // đang ở phần nghe mô phỏng → tự chuyển
    const prevLocked = S.cur === 0 || !canGoTo(S.cur - 1);

    $app.innerHTML = `
      <div class="quizbar">
        <span class="tag ${exam ? "exam" : ""}">${exam ? (S.sim ? "⏱️ Thi thật (mô phỏng)" : "⏱️ Thi thử") : "⚡ Luyện tập"}</span>
        <div class="progress small">Đã làm ${answeredN}/${S.flat.length} câu${S.label ? " · " + esc(S.label) : ""}
          <div class="bar"><i style="width:${answeredN / S.flat.length * 100}%"></i></div></div>
        ${exam ? `<span class="timer" id="timer">${fmtTime(S.left)}</span>
                  <button class="btn primary" id="submit">Nộp bài</button>` :
                 `<button class="btn" id="submit">Kết thúc</button>`}
      </div>

      <section class="card">
        <span class="tag">${P.skill === "L" ? "🎧" : "📖"} ${P.name}</span>
        <div class="instr">${P.instr}</div>
        ${P.skill === "L" ? `<div class="audio">
            ${S.sim ? `<span class="tag exam">Chỉ phát 1 lần – tự chuyển câu khi hết thời gian</span>`
                    : `<button class="btn primary" id="play">▶ Nghe${S.heard[S.cur] ? " lại" : ""}</button>
                       <button class="btn ghost" id="stop">■ Dừng</button>`}
            <span class="muted small" id="audioStatus"></span>
          </div>` : ""}
        ${g.img ? `<figure class="photo"><img src="${esc(asset(g.img.src))}" alt="Ảnh Part 1" loading="eager">
            <figcaption>Ảnh: ${esc(g.img.credit.artist)} · ${esc(g.img.credit.license)} · <a href="${esc(g.img.credit.link)}" target="_blank" rel="noopener">Wikimedia Commons</a></figcaption></figure>` : ""}
        <div id="transcript"></div>
        ${g.graphic ? `<div class="graphic">${g.graphic}</div>` : ""}
        ${g.passage ? `<div class="passage">${g.passage}</div>` : ""}
        <div id="qs">${g.questions.map((q, i) => renderQuestion(g, i, first + i)).join("")}</div>
        <div class="navrow">
          <button class="btn" id="prev" ${prevLocked ? "disabled" : ""}>← Trước</button>
          ${lockNav ? `<button class="btn ghost small" id="skip" title="Đề thật không có nút này">Bỏ qua đoạn nghe ⏭</button>` :
            isLast ? `<button class="btn primary" id="end">${exam ? "Nộp bài" : "Xem kết quả"}</button>`
                   : `<button class="btn ${revealed ? "primary" : ""}" id="next" ${nextLocked ? "disabled" : ""}>Tiếp →</button>`}
        </div>
      </section>

      <section class="card">
        <h2 class="small" style="margin-bottom:8px">Danh sách câu hỏi</h2>
        <div class="palette">${S.flat.map(f => {
          const a = S.answers[f.key];
          let cls = "";
          if (a !== undefined) cls = exam ? "done" : (a === f.q.a ? "ok" : "bad");
          if (f.gi === S.cur) cls += " cur";
          return `<button class="${cls}" data-jump="${f.gi}" ${canGoTo(f.gi) ? "" : "disabled"}>${f.num}</button>`;
        }).join("")}</div>
      </section>`;

    renderTranscript();
    const $ = s => $app.querySelector(s);
    $("#submit").onclick = () => finish(true);
    if ($("#prev")) $("#prev").onclick = () => go(S.cur - 1);
    if ($("#next")) $("#next").onclick = () => go(S.cur + 1);
    if ($("#skip")) $("#skip").onclick = () => { if (S.cur < S.groups.length - 1) go(S.cur + 1); else finish(true); };
    if ($("#end")) $("#end").onclick = () => finish(true);
    if ($("#play")) $("#play").onclick = playCurrent;
    if ($("#stop")) $("#stop").onclick = () => { tts.stop(); const st = $("#audioStatus"); if (st) st.textContent = ""; };
    $app.querySelectorAll("[data-jump]").forEach(b => b.onclick = () => go(+b.dataset.jump));
    $app.querySelectorAll("[data-opt]").forEach(b => b.onclick = () => choose(g, +b.dataset.q, +b.dataset.opt));
  }

  function renderTranscript() {
    const g = S.groups[S.cur];
    const el = document.getElementById("transcript");
    if (!el || !isL(g)) return;
    const show = S.mode !== "exam" && g.questions.every((_, i) => S.answers[qKey(g, i)] !== undefined);
    el.innerHTML = show ? transcriptHTML(g) : "";
  }
  function transcriptHTML(g) {
    const who = s => ({ M: "Man", W: "Woman", M2: "Man 2", W2: "Woman 2", Q: "Speaker 1" })[s] || s;
    const lines = [];
    if (g.part === 4) lines.push(...g.script.map(l => `<p>${esc(l.t)}</p>`));
    else if (g.part === 3) lines.push(...g.script.map(l => `<p><b>${who(l.s)}:</b> ${esc(l.t)}</p>`));
    else if (g.part === 2) lines.push(`<p><b>Q:</b> ${esc(g.script[0].t)}</p>`);
    if (g.part <= 2) {
      const q = g.questions[0];
      lines.push(...q.o.map((o, i) => `<p><b>(${LETTERS[i]})</b> ${esc(o)}</p>`));
    }
    return lines.length ? `<div class="transcript"><b class="small">📝 Transcript</b>${lines.join("")}</div>` : "";
  }

  function renderQuestion(g, i, num) {
    const q = g.questions[i];
    const key = qKey(g, i);
    const a = S.answers[key];
    const exam = S.mode === "exam";
    const reveal = !exam && a !== undefined;
    const showText = !q.hideText || reveal;
    const qtext = g.part === 1 ? `<span class="muted">Nghe 4 câu mô tả và chọn câu đúng nhất.</span>`
      : g.part === 2 ? (reveal ? esc(q.q) : "<span class='muted'>Nghe câu hỏi và 3 câu trả lời.</span>")
      : esc(q.q);
    const opts = q.o.map((o, j) => {
      let cls = "";
      if (reveal) { if (j === q.a) cls = "correct"; else if (j === a) cls = "wrong"; }
      else if (a === j) cls = "sel";
      const txt = showText ? esc(o) : "";
      return `<button class="opt ${cls} ${showText ? "" : "bare"}" data-q="${i}" data-opt="${j}" ${reveal ? "disabled" : ""}><span class="L">(${LETTERS[j]})</span><span>${txt}</span></button>`;
    }).join("");
    const exp = reveal ? `<div class="explain ${a === q.a ? "ok" : "bad"}">
        <b>${a === q.a ? "✅ Chính xác!" : `❌ Sai rồi – Đáp án đúng: (${LETTERS[q.a]}) ${esc(q.o[q.a])}`}</b>${esc(q.e)}</div>` : "";
    return `<div class="q"><div class="qtext"><span class="qnum">${num}.</span>${qtext}</div><div class="opts ${showText ? "" : "row-opts"}">${opts}</div>${exp}</div>`;
  }

  function choose(g, i, j) {
    const key = qKey(g, i);
    if (S.mode !== "exam" && S.answers[key] !== undefined) return;
    S.answers[key] = j;
    const scrollY = window.scrollY;
    renderQuiz();                 // không dừng/phát lại âm thanh khi chọn đáp án
    window.scrollTo(0, scrollY);
  }

  function go(i) {
    if (!S || i < 0 || i >= S.groups.length) return;
    tts.stop();
    S.cur = i;
    renderQuiz();
    window.scrollTo({ top: 0, behavior: "smooth" });
    const g = S.groups[i];
    const revealed = S.mode !== "exam" && g.questions.every((_, k) => S.answers[qKey(g, k)] !== undefined);
    if (isL(g) && !revealed && !(S.sim && S.heard[i])) setTimeout(() => { if (S && S.cur === i) playCurrent(); }, 400);
  }

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
          ${S.label && S.label.indexOf("Đề đầy đủ") === 0 ? `<button class="btn" id="newPaper">Xáo một đề 200 câu khác</button>` : ""}
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
          if (r.g.img) ctx += `<img class="thumb" src="${esc(asset(r.g.img.src))}" alt="">`;
          if (r.g.graphic) ctx += `<div class="graphic">${r.g.graphic}</div>`;
          if (r.g.passage) ctx += `<details><summary>Xem đoạn văn</summary><div class="passage" style="margin-top:8px">${r.g.passage}</div></details>`;
          if (isL(r.g)) ctx += `<details ${r.g.part <= 2 ? "open" : ""}><summary>Xem transcript</summary>${transcriptHTML(r.g)}</details>`;
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
    $app.querySelector("#again").onclick = () => startSession(groupsSnapshot, mode, S.label, S.label && S.label.indexOf("Đề đầy đủ") === 0 ? { minutes: settings.minutes || 120 } : null);
    const newPaper = $app.querySelector("#newPaper");
    if (newPaper) newPaper.onclick = () => startFull();
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
    const keys = getWrong().filter(k => BANK.some(g => g.id === k.split("#")[0]));
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
    const g = S.groups[S.cur];
    if (e.key === "ArrowRight" && !(S.sim && isL(g))) go(S.cur + 1);
    else if (e.key === "ArrowLeft" && S.cur > 0 && canGoTo(S.cur - 1)) go(S.cur - 1);
    else if (e.key === " " && isL(g) && !S.sim) { e.preventDefault(); playCurrent(); }
    else if (/^[a-d1-4]$/i.test(e.key) && g.questions.length === 1) {
      const j = /\d/.test(e.key) ? +e.key - 1 : e.key.toLowerCase().charCodeAt(0) - 97;
      if (j < g.questions[0].o.length) choose(g, 0, j);
    }
  });

  refreshBadge();
  renderHome();
})();
