// 03 "Så jobbar vi": a WebGL constellation that draws itself star by star, from first contact to the client's first order.
// Fixed camera (no fast motion, no full-screen flashes), plays once per scroll-in and resets when it leaves the screen.
import type * as T from "three";

export type FlowText = {
  aria: string; hud: string; done: string; idleS: string; idleP: string; step: string; of: string;
  orderS: string; orderB: string; again: string;
  nodes: { t: string; s: string; c: string }[];
};

const ICON: string[] = [
  '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8"/>',
  '<path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/>',
  '<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5 1-1.5 2-1.5h2a4 4 0 0 0 4-4c0-4.5-4-8-9-8z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>',
  '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3 3 7 3s7-1.3 7-3"/>',
  '<path d="M12 3c3 2 5 6 5 10l-2 3H9l-2-3c0-4 2-8 5-10z"/><circle cx="12" cy="10" r="1.8"/><path d="M10 19l2 2 2-2"/>',
  '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
  '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h4"/>',
  '<path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
];
// Star positions: L = landscape (reads left→right), P = portrait (reads top→bottom). Z gives a little depth.
const POS: { L: [number, number]; P: [number, number]; z: number }[] = [
  { L: [-6.4, -1.4], P: [-2.3, 5.4], z: 0.3 },
  { L: [-4.6, 1.2], P: [0.4, 4.7], z: -0.4 },
  { L: [-2.4, 2.7], P: [2.3, 3.2], z: 0.5 },
  { L: [-0.5, 1.0], P: [0.1, 1.9], z: -0.2 },
  { L: [-1.6, -2.0], P: [-2.3, 0.6], z: 0.4 },
  { L: [1.3, -2.8], P: [-0.6, -0.9], z: -0.5 },
  { L: [2.7, -0.6], P: [2.0, -1.8], z: 0.2 },
  { L: [3.4, 2.1], P: [2.4, -3.7], z: -0.3 },
  { L: [6.0, 2.9], P: [-0.1, -4.5], z: 0.5 },
  { L: [6.4, -0.9], P: [-2.2, -5.8], z: 0 },
];
const CYAN = 0x4fc3f7, GOLD = 0xf0b347, AMOUNT = 1249;

type Node = { p: T.Vector3; g: T.Group; crystal: T.LineSegments; ring: T.Mesh; halo: T.Sprite; el: HTMLDivElement };
type Fx = { pts: T.Points; from: T.Vector3[]; to: T.Vector3[]; vel: T.Vector3[]; mode: "in" | "out"; st: number; dur: number };
type Shock = { m: T.Mesh; size: number; dur: number; st: number };

export async function mountConstellation(stage: HTMLElement, txt: FlowText, lang: string): Promise<() => void> {
  const THREE = await import("three");
  const [{ EffectComposer }, { RenderPass }, { UnrealBloomPass }] = await Promise.all([
    import("three/examples/jsm/postprocessing/EffectComposer.js"),
    import("three/examples/jsm/postprocessing/RenderPass.js"),
    import("three/examples/jsm/postprocessing/UnrealBloomPass.js"),
  ]);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const LAST = POS.length - 1;
  const q = <E extends HTMLElement>(s: string) => stage.querySelector(s) as E;
  const stepEl = q<HTMLElement>(".cst-step"), cap = q<HTMLElement>(".cst-cap"), capS = q<HTMLElement>(".cst-cap small"),
    capP = q<HTMLElement>(".cst-cap p"), order = q<HTMLElement>(".cst-order"), amt = q<HTMLElement>(".cst-amt"), again = q<HTMLButtonElement>(".cst-again");

  /* renderer */
  const small = stage.clientWidth < 700;
  const renderer = new THREE.WebGLRenderer({ antialias: !small, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(small ? 1.5 : 2, window.devicePixelRatio || 1));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute("aria-hidden", "true");
  stage.prepend(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 16 / 9, 0.1, 300);
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(800, 450), 0.75, 0.5, 0.15);
  composer.addPass(bloom);

  const c = document.createElement("canvas"); c.width = c.height = 64;
  const g2 = c.getContext("2d")!; const rg = g2.createRadialGradient(32, 32, 0, 32, 32, 32);
  rg.addColorStop(0, "rgba(255,255,255,1)"); rg.addColorStop(0.25, "rgba(255,255,255,.5)"); rg.addColorStop(1, "rgba(255,255,255,0)");
  g2.fillStyle = rg; g2.fillRect(0, 0, 64, 64);
  const GT = new THREE.CanvasTexture(c);
  const add = THREE.AdditiveBlending;
  const disposables: { dispose(): void }[] = [GT];

  const cloud = (n: number, fn: () => T.Vector3, size: number, color: number, op: number) => {
    const p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { const v = fn(); p.set([v.x, v.y, v.z], i * 3); }
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    const m = new THREE.PointsMaterial({ size, color, map: GT, transparent: true, opacity: op, depthWrite: false, blending: add });
    disposables.push(g, m); return new THREE.Points(g, m);
  };
  const stars = cloud(small ? 500 : 900, () => new THREE.Vector3((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40, -8 - Math.random() * 25), 0.22, 0xb9c4e6, 0.6);
  const dust = cloud(small ? 140 : 260, () => new THREE.Vector3((Math.random() - 0.5) * 18, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 4), 0.08, CYAN, 0.3);
  scene.add(stars, dust);

  /* stars of the constellation + their DOM labels */
  const nodes: Node[] = POS.map((pos, i) => {
    const gold = i === LAST, col = gold ? GOLD : CYAN, g = new THREE.Group();
    const cg = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(gold ? 0.42 : 0.32, 0)), cm = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.9 });
    const crystal = new THREE.LineSegments(cg, cm);
    const og = new THREE.IcosahedronGeometry(gold ? 0.16 : 0.11, 1), om = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const hm = new THREE.SpriteMaterial({ map: GT, color: col, transparent: true, opacity: 0.55, depthWrite: false, blending: add });
    const halo = new THREE.Sprite(hm); halo.scale.setScalar(gold ? 1.8 : 1.2);
    const rgeo = new THREE.TorusGeometry(gold ? 0.65 : 0.5, 0.008, 6, 80), rm = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.5 });
    const ring = new THREE.Mesh(rgeo, rm); ring.rotation.x = 1.2;
    disposables.push(cg, cm, og, om, hm, rgeo, rm);
    g.add(halo, crystal, new THREE.Mesh(og, om), ring); g.scale.setScalar(0.0001); g.visible = false; scene.add(g);
    const el = document.createElement("div");
    el.className = "cst-lab" + (gold ? " gold" : "");
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = `<div class="cst-card"><div class="cst-ico"><svg viewBox="0 0 24 24">${ICON[i]}</svg></div><div class="cst-txt"><b></b><span></span></div></div>`;
    el.querySelector("b")!.textContent = txt.nodes[i].t; el.querySelector(".cst-txt span")!.textContent = txt.nodes[i].s;
    stage.appendChild(el);
    return { p: new THREE.Vector3(), g, crystal, ring, halo, el };
  });

  /* the line that draws itself (no pre-drawn string) */
  const SEG = 400, RAD = 6;
  const tubeMat = new THREE.MeshBasicMaterial({ color: CYAN }); disposables.push(tubeMat);
  let path: T.CurvePath<T.Vector3> | null = null, litTube: T.Mesh | null = null, FR: number[] = [], litF = 0;
  const setLit = (f: number) => { litF = f; litTube?.geometry.setDrawRange(0, Math.floor(Math.max(0, Math.min(1, f)) * SEG) * RAD * 6); };
  const buildLine = () => {
    if (litTube) { scene.remove(litTube); litTube.geometry.dispose(); }
    path = new THREE.CurvePath<T.Vector3>();
    for (let i = 0; i < LAST; i++) path.add(new THREE.LineCurve3(nodes[i].p.clone(), nodes[i + 1].p.clone()));
    const tot = path.getLength(); FR = [0, ...path.getCurveLengths().map((v) => v / tot)];
    litTube = new THREE.Mesh(new THREE.TubeGeometry(path, SEG, 0.028, RAD, false), tubeMat);
    scene.add(litTube); setLit(litF);
  };

  /* fixed framing of the finished constellation, between HUD and caption */
  let portrait = false; const camBase = new THREE.Vector3(), lookAt = new THREE.Vector3();
  const layout = () => {
    const w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return;
    portrait = w / h < 1; stage.classList.toggle("compact", w < 620);
    nodes.forEach((n, i) => { const s = portrait ? POS[i].P : POS[i].L; n.p.set(portrait ? s[0] * 1.25 : s[0], s[1], POS[i].z); n.g.position.copy(n.p); });
    buildLine();
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    composer.setSize(w, h); bloom.resolution.set(w, h);
    const cw = portrait ? 9.2 : 15.6, ch = portrait ? 12.6 : 7.6, areaH = portrait ? 0.7 : 0.66;
    const tanV = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const d = Math.max(ch / (2 * tanV * areaH), cw / (2 * tanV * camera.aspect * 0.92));
    const shift = (portrait ? 0.1 : 0.05) * 2 * d * tanV;
    camBase.set(0, -shift, d); lookAt.set(0, -shift, 0);
  };
  const ro = new ResizeObserver(layout); ro.observe(stage); layout();

  /* comet */
  const pkM = new THREE.SpriteMaterial({ map: GT, color: 0xffffff, transparent: true, depthWrite: false, blending: add }); disposables.push(pkM);
  const pk = new THREE.Sprite(pkM); pk.scale.setScalar(0.55); pk.visible = false; scene.add(pk);
  const TRAIL = Array.from({ length: 14 }, (_, k) => {
    const m = new THREE.SpriteMaterial({ map: GT, color: CYAN, transparent: true, opacity: 0.45 * (1 - k / 14), depthWrite: false, blending: add }); disposables.push(m);
    const s = new THREE.Sprite(m); s.scale.setScalar(0.45 * (1 - k / 14) + 0.08); s.visible = false; scene.add(s); return s;
  });
  const hist: T.Vector3[] = [];

  /* materialize bursts + shock rings (local to each star) */
  const fx: Fx[] = [], shocks: Shock[] = [];
  const burst = (center: T.Vector3, n: number, col: number, mode: "in" | "out", dur: number, spread = 1) => {
    const pos = new Float32Array(n * 3), from: T.Vector3[] = [], to: T.Vector3[] = [], vel: T.Vector3[] = [];
    for (let i = 0; i < n; i++) {
      const d = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      if (mode === "in") { from.push(center.clone().addScaledVector(d, (1 + Math.random() * 1.6) * spread)); to.push(center.clone().addScaledVector(d, 0.3)); }
      else { from.push(center.clone()); vel.push(d.multiplyScalar((0.6 + Math.random() * 1.6) * spread)); }
      pos.set([from[i].x, from[i].y, from[i].z], i * 3);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const m = new THREE.PointsMaterial({ size: mode === "in" ? 0.1 : 0.13, color: col, map: GT, transparent: true, depthWrite: false, blending: add });
    const pts = new THREE.Points(g, m); scene.add(pts); fx.push({ pts, from, to, vel, mode, st: performance.now(), dur });
  };
  const shock = (p: T.Vector3, col: number, size: number, dur: number) => {
    const m = new THREE.Mesh(new THREE.RingGeometry(0.92, 1, 72), new THREE.MeshBasicMaterial({ color: col, transparent: true, side: THREE.DoubleSide, depthWrite: false, blending: add }));
    m.position.copy(p); scene.add(m); shocks.push({ m, size, dur, st: performance.now() });
  };
  const killFx = (o: Fx) => { scene.remove(o.pts); o.pts.geometry.dispose(); (o.pts.material as T.Material).dispose(); };
  const killShock = (o: Shock) => { scene.remove(o.m); o.m.geometry.dispose(); (o.m.material as T.Material).dispose(); };
  const clearFx = () => { fx.forEach(killFx); fx.length = 0; shocks.forEach(killShock); shocks.length = 0; };
  const pops: { n: Node; st: number; dur: number }[] = [];
  const backOut = (t: number) => { const k = 1.4; return 1 + (k + 1) * Math.pow(t - 1, 3) + k * Math.pow(t - 1, 2); };

  /* render loop, paused offscreen */
  let onScreen = false, lastNow = performance.now(), clock = 0, raf = 0, goldMix = 0, goldGoal = 0;
  const tmp = new THREE.Vector3(), cCol = new THREE.Color(CYAN), gCol = new THREE.Color(GOLD);
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - lastNow) / 1000); lastNow = now; if (!onScreen) return; clock += dt;
    dust.rotation.z += dt * 0.01;
    nodes.forEach((n, i) => {
      if (!n.g.visible) return;
      n.crystal.rotation.y += dt * 0.35; n.crystal.rotation.x += dt * 0.15; n.ring.rotation.z += dt * 0.25;
      n.halo.material.opacity = 0.5 + 0.08 * Math.sin(clock * 1.2 + i);
    });
    for (let j = pops.length - 1; j >= 0; j--) { const o = pops[j], t = Math.min(1, (now - o.st) / o.dur); o.n.g.scale.setScalar(Math.max(0.0001, backOut(t))); if (t >= 1) pops.splice(j, 1); }
    for (let j = fx.length - 1; j >= 0; j--) {
      const o = fx[j], t = Math.min(1, (now - o.st) / o.dur), a = o.pts.geometry.attributes.position as T.BufferAttribute;
      for (let i = 0; i < o.from.length; i++) {
        if (o.mode === "in") { const e = t * t * (3 - 2 * t); a.setXYZ(i, o.from[i].x + (o.to[i].x - o.from[i].x) * e, o.from[i].y + (o.to[i].y - o.from[i].y) * e, o.from[i].z + (o.to[i].z - o.from[i].z) * e); }
        else { const s = (t * o.dur) / 1000; a.setXYZ(i, o.from[i].x + o.vel[i].x * s, o.from[i].y + o.vel[i].y * s - 0.25 * s * s, o.from[i].z + o.vel[i].z * s); }
      }
      a.needsUpdate = true;
      (o.pts.material as T.PointsMaterial).opacity = o.mode === "in" ? (t < 0.75 ? 0.9 : (1 - t) * 3.6) : 0.9 * (1 - t);
      if (t >= 1) { killFx(o); fx.splice(j, 1); }
    }
    for (let j = shocks.length - 1; j >= 0; j--) {
      const o = shocks[j], t = Math.min(1, (now - o.st) / o.dur), e = 1 - Math.pow(1 - t, 3);
      o.m.quaternion.copy(camera.quaternion); o.m.scale.setScalar(0.15 + o.size * e); (o.m.material as T.MeshBasicMaterial).opacity = 0.75 * (1 - t);
      if (t >= 1) { killShock(o); shocks.splice(j, 1); }
    }
    if (pk.visible) { hist.unshift(pk.position.clone()); if (hist.length > TRAIL.length) hist.pop(); }
    TRAIL.forEach((s, k) => { const h = hist[k]; s.visible = pk.visible && !!h; if (h) s.position.copy(h); });
    goldMix += (goldGoal - goldMix) * Math.min(1, dt * 1.5); tubeMat.color.copy(cCol).lerp(gCol, goldMix);
    camera.position.set(camBase.x + Math.sin(clock * 0.12) * 0.35, camBase.y + Math.sin(clock * 0.09) * 0.2, camBase.z); camera.lookAt(lookAt);

    const w = stage.clientWidth, h = stage.clientHeight;
    nodes.forEach((n) => {
      if (!n.el.classList.contains("in")) return;
      tmp.copy(n.p).project(camera);
      const x = (tmp.x * 0.5 + 0.5) * w, y = (-tmp.y * 0.5 + 0.5) * h, lw = n.el.offsetWidth, lh = n.el.offsetHeight;
      let lx: number, ly: number;
      if (portrait) { lx = n.p.x < 0 ? x + 18 : x - 18 - lw; ly = y - lh / 2; }
      else { lx = x - lw / 2; ly = n.p.y >= 0.3 ? y - lh - 20 : y + 20; }
      lx = Math.max(8, Math.min(w - lw - 8, lx)); ly = Math.max(40, Math.min(h - lh - 8, ly));
      n.el.style.transform = `translate(${lx}px,${ly}px)`;
    });
    composer.render();
  };
  raf = requestAnimationFrame(frame);

  /* timeline */
  let token = 0;
  const timers: number[] = [];
  const later = (fn: () => void, ms: number) => { timers.push(window.setTimeout(fn, ms)); };
  const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  const tween = (ms: number, fn: ((t: number) => void) | null, tok: number) => new Promise<void>((res, rej) => {
    const st = performance.now();
    const f = (now: number) => { if (tok !== token) return rej(new Error("stop")); const t = Math.min(1, (now - st) / ms); fn?.(t); if (t < 1) requestAnimationFrame(f); else res(); };
    f(st);
  });
  const wait = (ms: number, tok: number) => tween(ms, null, tok);
  const pad = (v: number) => String(v).padStart(2, "0");
  const kr = (v: number) => Math.round(v).toLocaleString(lang === "en" ? "en-GB" : "sv-SE") + " kr";

  const reset = () => {
    timers.forEach(clearTimeout); timers.length = 0;
    clearFx(); pops.length = 0; hist.length = 0; setLit(0); pk.visible = false; goldGoal = 0; goldMix = 0;
    nodes.forEach((n) => { n.g.visible = false; n.g.scale.setScalar(0.0001); n.el.classList.remove("in", "past"); });
    order.classList.remove("on"); amt.textContent = kr(0); stepEl.textContent = `00 / ${pad(POS.length)}`;
    cap.classList.remove("hide", "swap"); capS.textContent = txt.idleS; capP.textContent = txt.idleP;
  };
  const materialize = (i: number) => {
    const n = nodes[i], col = i === LAST ? GOLD : CYAN, big = i === LAST ? 1.4 : 1;
    burst(n.p, Math.round((small ? 120 : 170) * big), col, "in", 600, 1.7 * big);
    burst(n.p, small ? 40 : 60, 0xffffff, "in", 560, 1.2 * big);
    later(() => {
      n.g.visible = true; pops.push({ n, st: performance.now(), dur: 650 });
      burst(n.p, Math.round((small ? 80 : 110) * big), col, "out", 1300, 1.3 * big);
      shock(n.p, col, 1.9 * big, 950); later(() => shock(n.p, 0xffffff, 1.2 * big, 700), 120);
    }, 380);
    later(() => { nodes.forEach((m, j) => { if (j < i) m.el.classList.add("past"); }); n.el.classList.add("in"); }, 420);
    stepEl.textContent = `${pad(i + 1)} / ${pad(POS.length)}`;
    cap.classList.remove("swap"); void cap.offsetWidth; cap.classList.add("swap");
    capS.textContent = `${txt.step} ${i + 1} ${txt.of} ${POS.length}`; capP.textContent = txt.nodes[i].c;
  };
  const run = async () => {
    const tok = ++token; reset();
    try {
      await wait(400, tok);
      for (let i = 0; i <= LAST; i++) {
        materialize(i);
        await wait(i === LAST ? 1300 : 1250, tok);
        if (i === LAST) break;
        pk.visible = true; const a = FR[i], b = FR[i + 1];
        await tween(850, (t) => { const u = a + (b - a) * ease(t); pk.position.copy(path!.getPointAt(u)); setLit(u); }, tok);
        pk.visible = false; hist.length = 0;
      }
      goldGoal = 1; burst(nodes[LAST].p, 140, GOLD, "out", 2600);
      if (!stage.classList.contains("compact")) nodes.forEach((n) => n.el.classList.remove("past"));
      await wait(500, tok); cap.classList.add("hide"); order.classList.add("on"); stepEl.textContent = txt.done;
      await tween(1300, (t) => { amt.textContent = kr(AMOUNT * ease(t)); }, tok);
    } catch { /* stopped */ }
  };
  const still = () => {
    token++; reset(); setLit(1); goldGoal = goldMix = 1;
    nodes.forEach((n, i) => { n.g.visible = true; n.g.scale.setScalar(1); n.el.classList.add("in"); if (i < LAST && stage.classList.contains("compact")) n.el.classList.add("past"); });
    cap.classList.add("hide"); order.classList.add("on"); amt.textContent = kr(AMOUNT); stepEl.textContent = txt.done;
  };
  const onAgain = () => (reduce ? still() : run());
  again.addEventListener("click", onAgain);
  reset();

  let played = false;
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    onScreen = e.isIntersecting;
    if (e.intersectionRatio >= 0.5 && !played) { played = true; if (reduce) still(); else run(); }
    else if (!e.isIntersecting && played) { played = false; token++; reset(); }
  }), { threshold: [0, 0.5] });
  io.observe(stage);

  return () => {
    token++; timers.forEach(clearTimeout); cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
    again.removeEventListener("click", onAgain); clearFx();
    if (litTube) litTube.geometry.dispose();
    disposables.forEach((d) => d.dispose());
    composer.dispose(); renderer.dispose(); renderer.domElement.remove();
    nodes.forEach((n) => n.el.remove());
  };
}
