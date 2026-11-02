/*
 * Ghép một đề 200 câu theo cấu trúc TOEIC Listening & Reading từ 2019:
 * P1×6, P2×25, P3×39 (13 đoạn), P4×30 (10 bài), P5×30, P6×16 (4 đoạn), P7×54.
 * Chọn theo dạng câu (không chép đề ETS). Thứ tự Part giữ 1 → 7.
 */
(function (root) {
  "use strict";

  const P5_KIND = {
    "p5-1": "function", "p5-2": "form", "p5-3": "function", "p5-4": "form", "p5-5": "function",
    "p5-6": "function", "p5-7": "verb", "p5-8": "vocab", "p5-9": "verb", "p5-10": "form",
    "p5-11": "function", "p5-12": "vocab", "p5-13": "function", "p5-14": "function", "p5-15": "form",
    "p5-16": "verb", "p5-17": "form", "p5-18": "verb", "p5-19": "function", "p5-20": "form",
    "p5-21": "form", "p5-22": "form", "p5-23": "verb", "p5-24": "function", "p5-25": "vocab",
    "p5-26": "form", "p5-27": "verb", "p5-28": "function", "p5-29": "function", "p5-30": "form",
    "p5-31": "form", "p5-32": "form", "p5-33": "function", "p5-34": "function", "p5-35": "form",
    "p5-36": "form", "p5-37": "function", "p5-38": "verb", "p5-39": "function", "p5-40": "verb",
    "p5-41": "function", "p5-42": "form", "p5-43": "function", "p5-44": "verb", "p5-45": "vocab",
    "p5-46": "form", "p5-47": "form", "p5-48": "function", "p5-49": "function", "p5-50": "function",
    "p5-51": "form", "p5-52": "form", "p5-53": "form", "p5-54": "vocab", "p5-55": "form"
  };

  const P5_QUOTA = [["verb", 7], ["form", 5], ["function", 8], ["vocab", 10]];
  const P2_QUOTA = [["wh", 9], ["yn", 5], ["stmt", 6], ["invite", 3], ["alt", 2]];
  const SCENE_P1 = { "p1-4": 1, "p1-6": 1, "p1-9": 1 };

  function shuffle(a, rand) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function byPart(bank, p) { return bank.filter(g => g.part === p); }

  function levelOf(g) { return g.level || 2; }

  function takeN(cands, n, doShuffle, rand) {
    if (n <= 0) return [];
    const src = doShuffle ? shuffle(cands, rand) : cands.slice();
    if (!doShuffle) return src.slice(0, n);
    const buckets = { 1: [], 2: [], 3: [] };
    src.forEach(g => (buckets[levelOf(g)] || buckets[2]).push(g));
    const order = [2, 1, 2, 3, 2];
    const out = [];
    let i = 0, guard = 0;
    while (out.length < n && guard < 10000) {
      guard++;
      const prefer = order[i++ % order.length];
      const b = buckets[prefer].length ? buckets[prefer]
        : buckets[2].length ? buckets[2]
        : buckets[1].length ? buckets[1]
        : buckets[3];
      if (!b.length) break;
      out.push(b.shift());
    }
    return out;
  }

  function quotaPick(pool, quotas, kindOf, need, doShuffle, rand) {
    const buckets = {};
    pool.forEach(g => {
      const k = kindOf(g);
      (buckets[k] = buckets[k] || []).push(g);
    });
    const chosen = [];
    const used = new Set();
    quotas.forEach(([k, n]) => {
      const cands = (buckets[k] || []).filter(g => !used.has(g.id));
      takeN(cands, Math.min(n, cands.length), doShuffle, rand).forEach(g => {
        chosen.push(Object.assign({}, g, { _bucket: k }));
        used.add(g.id);
      });
    });
    const rest = pool.filter(g => !used.has(g.id));
    takeN(rest, need - chosen.length, doShuffle, rand).forEach(g => {
      chosen.push(Object.assign({}, g, { _bucket: kindOf(g) }));
    });
    return chosen.slice(0, need);
  }

  function interleave(groups) {
    const buckets = {};
    const keys = [];
    groups.forEach(g => {
      const k = g._bucket || "x";
      if (!buckets[k]) { buckets[k] = []; keys.push(k); }
      buckets[k].push(g);
    });
    const out = [];
    let added = true;
    while (added) {
      added = false;
      keys.forEach(k => {
        if (buckets[k].length) { out.push(buckets[k].shift()); added = true; }
      });
    }
    return out;
  }

  function implied(g) {
    return g.questions.some(q => /imply when|mean when|what does the .+ mean when|why does the .+ say/i.test(q.q));
  }

  function reserve(pool, rules, need, doShuffle, rand) {
    const items = doShuffle ? shuffle(pool, rand) : pool.slice();
    const chosen = [];
    const used = new Set();
    rules.forEach(rule => {
      const cands = items.filter(g => !used.has(g.id) && rule.test(g));
      takeN(cands, rule.min, doShuffle, rand).forEach(g => {
        chosen.push(g);
        used.add(g.id);
      });
    });
    const rest = items.filter(g => !used.has(g.id));
    takeN(rest, need - chosen.length, doShuffle, rand).forEach(g => chosen.push(g));
    return chosen.slice(0, need);
  }

  function orderListening(groups, part, doShuffle, rand) {
    const band = g => (g.graphic ? 2 : 0) + (part === 3 && g.speakers === 3 ? 1 : 0);
    const bands = [[], [], [], []];
    groups.forEach(g => bands[band(g)].push(g));
    return bands.flatMap(list => {
      if (!list.length) return [];
      if (!doShuffle) return list.slice().sort((a, b) => String(a.id).localeCompare(String(b.id)));
      return shuffle(list, rand);
    });
  }

  function p2Kind(g) {
    if (g.kind) return g.kind;
    const q = (g.questions[0].q || "").trim();
    if (/\bor\b/i.test(q) && /\?/.test(q) && /^(should|would|do|did|are|is|can|could|will|shall)\b/i.test(q)) return "alt";
    if (/^(why don't|why not|how about|what about|let's|shall we)\b/i.test(q)) return "invite";
    if (/^(would you like|would you mind|could you|can you|will you)\b/i.test(q)) return "invite";
    if (/^(where|when|who|whose|why|what|which|how)\b/i.test(q)) return "wh";
    if (/\?/.test(q)) return "yn";
    return "stmt";
  }

  function p5Kind(g) {
    const q = g.questions[0];
    return q.kind || g.kind || P5_KIND[g.id] || "vocab";
  }

  function p7Form(g) {
    if (g.form) return g.form;
    if (g.id === "p7-6") return "double";
    return "single";
  }

  function countQ(groups) { return groups.reduce((n, g) => n + g.questions.length, 0); }

  function combosSum(items, target) {
    const out = [];
    (function rec(start, remain, acc) {
      if (remain === 0) { out.push(acc.slice()); return; }
      for (let i = start; i < items.length; i++) {
        const n = items[i].questions.length;
        if (n <= remain) {
          acc.push(items[i]);
          rec(i + 1, remain - n, acc);
          acc.pop();
        }
      }
    })(0, target, []);
    return out;
  }

  function orderSingles(list, doShuffle, rand) {
    const bands = {};
    list.forEach(g => {
      const n = g.questions.length;
      (bands[n] = bands[n] || []).push(g);
    });
    return Object.keys(bands).map(Number).sort((a, b) => a - b).flatMap(n => doShuffle ? shuffle(bands[n], rand) : bands[n]);
  }

  function pickP7(pool, doShuffle, rand) {
    const triples = pool.filter(g => p7Form(g) === "triple");
    const doubles = pool.filter(g => p7Form(g) === "double");
    const singles = pool.filter(g => p7Form(g) === "single");
    const t = takeN(triples, Math.min(3, triples.length), doShuffle, rand);
    const d = takeN(doubles, Math.min(2, doubles.length), doShuffle, rand);
    const need = 54 - countQ(t) - countQ(d);
    let options = combosSum(singles, need);
    const nice = options.filter(c =>
      c.some(g => g.questions.some(q => /best belong/i.test(q.q))) &&
      c.some(g => g.questions.some(q => /closest in meaning/i.test(q.q)))
    );
    if (nice.length) options = nice;
    const s = options.length ? options[doShuffle ? Math.floor(rand() * options.length) : 0] : takeN(singles, singles.length, false, rand);
    return orderSingles(s, doShuffle, rand).concat(d, t);
  }

  function tally(groups, kindOf) {
    const o = {};
    groups.forEach(g => { const k = kindOf(g); o[k] = (o[k] || 0) + 1; });
    return o;
  }

  function buildOfficialExam(bank, doShuffle, rand) {
    rand = rand || Math.random;
    const p1pool = byPart(bank, 1);
    const scenes = p1pool.filter(g => SCENE_P1[g.id]);
    const p1 = reserve(p1pool, [{ test: g => !!SCENE_P1[g.id], min: Math.min(1, scenes.length) }], 6, doShuffle, rand);

    const p2 = interleave(quotaPick(byPart(bank, 2), P2_QUOTA, p2Kind, 25, doShuffle, rand));

    const p3 = orderListening(reserve(byPart(bank, 3), [
      { test: g => g.speakers === 3, min: 2 },
      { test: g => !!g.graphic, min: 2 },
      { test: implied, min: 2 }
    ], 13, doShuffle, rand), 3, doShuffle, rand);

    const p4 = orderListening(reserve(byPart(bank, 4), [
      { test: g => !!g.graphic, min: 2 },
      { test: implied, min: 1 }
    ], 10, doShuffle, rand), 4, doShuffle, rand);

    const p5 = interleave(quotaPick(byPart(bank, 5), P5_QUOTA, p5Kind, 30, doShuffle, rand));
    const p6 = takeN(byPart(bank, 6), 4, doShuffle, rand);
    const p7 = pickP7(byPart(bank, 7), doShuffle, rand);

    const groups = [].concat(p1, p2, p3, p4, p5, p6, p7);
    const stats = {
      parts: {},
      p2: tally(p2, p2Kind),
      p5: tally(p5, p5Kind),
      p3: { three: p3.filter(g => g.speakers === 3).length, graphic: p3.filter(g => g.graphic).length, implied: p3.filter(implied).length, sets: p3.length },
      p4: { graphic: p4.filter(g => g.graphic).length, implied: p4.filter(implied).length, sets: p4.length },
      p7: {
        single: countQ(p7.filter(g => p7Form(g) === "single")),
        double: countQ(p7.filter(g => p7Form(g) === "double")),
        triple: countQ(p7.filter(g => p7Form(g) === "triple"))
      },
      total: countQ(groups)
    };
    [p1, p2, p3, p4, p5, p6, p7].forEach(list => {
      if (!list.length) return;
      stats.parts[list[0].part] = countQ(list);
    });
    return { groups, stats };
  }

  root.buildOfficialExam = buildOfficialExam;
})(typeof window !== "undefined" ? window : globalThis);
