/* =========================================================
   Super Awareness — サイト共通スクリプト
   ・中央タイトル＋サブタイトル＋横並びメニューを全ページに差し込みます
   ・seeds のカテゴリ絞り込みを動かします

   タイトル: TITLE / サブタイトル: SUBTITLE を書き換え
   メニュー: NAV に1行足す
   各ページの <body data-section="..."> で、ハイライトするメニューが決まる
   ========================================================= */

const TITLE = "Super Awareness";
const SUBTITLE = "A north star for the future we're building.";

const NAV = [
  { key: "intro",    label: "Intro",    href: "/" },
  { key: "personal", label: "Personal", href: "/personal.html" },
  { key: "seeds",    label: "Seeds",    href: "/seeds.html" },
  { key: "person",   label: "Person",   href: "/person.html" },
];

function buildHead(){
  const el = document.getElementById("top");
  if (!el) return;
  const section = document.body.dataset.section || "";
  const links = NAV.map(n =>
    `<a href="${n.href}" class="${n.key === section ? "current" : ""}">${n.label}</a>`
  ).join("");
  el.innerHTML =
    `<div class="masthead">
       <div class="title"><a href="/">${TITLE}</a></div>
       <div class="subtitle">${SUBTITLE}</div>
     </div>
     <nav class="topnav">${links}</nav>`;
}

function wireFilters(){
  const chips = document.querySelectorAll(".chip");
  if (!chips.length) return;
  const entries = document.querySelectorAll(".entry");
  const empty = document.getElementById("empty");
  chips.forEach(c => c.addEventListener("click", () => {
    chips.forEach(x => x.classList.remove("on"));
    c.classList.add("on");
    const f = c.dataset.f;
    let shown = 0;
    entries.forEach(e => {
      const ok = (f === "all" || e.dataset.cat === f);
      e.style.display = ok ? "" : "none";
      if (ok) shown++;
    });
    if (empty) empty.style.display = shown ? "none" : "block";
  }));
}

document.addEventListener("DOMContentLoaded", () => { buildHead(); wireFilters(); });
