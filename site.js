/* =========================================================
   Super Awareness — サイト共通スクリプト
   ・中央タイトル＋横並びメニューを全ページに差し込みます
   ・seeds のカテゴリ絞り込みを動かします

   メニューを増やしたいときは NAV に1行足す。
   タイトルを変えたいときは TITLE を書き換える。
   各ページの <body data-section="..."> で、今どのメニューを
   ハイライトするかが決まります（記事ページもこれで所属を指定）。
   ========================================================= */

const TITLE = "Super Awareness";

const NAV = [
  { key: "intro",    label: "Intro",    href: "/" },
  { key: "personal", label: "Personal", href: "/personal.html" },
  { key: "seeds",    label: "Seeds",    href: "/seeds.html" },
  { key: "person",   label: "Person",   href: "/person.html" },
];

/* マストヘッドのサグラダ（案1：立面図）。案2/3にしたいときはここを差し替え */
const SAGRADA = `
<svg viewBox="0 0 200 300" fill="none" stroke="#141414" stroke-width="1.4" stroke-linejoin="round">
  <path d="M30 285 L44 120 L58 285"/><line x1="44" y1="120" x2="44" y2="285"/>
  <path d="M58 285 L80 70 L102 285"/><line x1="80" y1="70" x2="80" y2="285"/>
  <path d="M96 285 L118 40 L140 285"/><line x1="118" y1="40" x2="118" y2="285"/>
  <path d="M140 285 L162 90 L184 285"/><line x1="162" y1="90" x2="162" y2="285"/>
  <line x1="20" y1="285" x2="190" y2="285"/>
  <g fill="#141414" stroke="none">
    <circle cx="44" cy="120" r="3"/><circle cx="80" cy="70" r="3.4"/>
    <circle cx="118" cy="40" r="3.8"/><circle cx="162" cy="90" r="3.4"/>
  </g>
</svg>`;

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
       <div class="sag">${SAGRADA}</div>
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
