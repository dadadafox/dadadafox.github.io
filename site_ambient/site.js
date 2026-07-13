/* =========================================================
   Super Awareness — サイト共通スクリプト
   ・サイドバー（タイトル / メニュー / サグラダ）を全ページに差し込みます
   ・seeds ページのカテゴリ絞り込みを動かします

   ページを増やしたら、下の NAV に1行足すだけでメニューに出ます。
   タイトルを変えたいときは TITLE を書き換えてください。
   ========================================================= */

const TITLE = "Super Awareness";

/* メニュー（この順番で表示されます）。ページを足したらここに1行追加 */
const NAV = [
  { label: "Intro",    href: "/" },
  { label: "Personal", href: "/personal.html" },
  { label: "Seeds",    href: "/seeds.html" },
  { label: "Person",   href: "/person.html" },
];

/* サイドバーのサグラダ・ファミリア（案1：立面図）。
   案2/案3に差し替えたいときは、この SAGRADA の中身を入れ替えます */
const SAGRADA = `
<svg viewBox="0 0 200 300" fill="none" stroke="#141414" stroke-width="1" stroke-linejoin="round">
  <g>
    <path d="M30 285 L44 120 L58 285"/><line x1="44" y1="120" x2="44" y2="285"/>
    <path d="M35 175 H53 M36 215 H52 M37 250 H51"/>
    <path d="M58 285 L80 70 L102 285"/><line x1="80" y1="70" x2="80" y2="285"/>
    <path d="M66 150 H94 M68 200 H92 M70 245 H90"/>
    <path d="M96 285 L118 40 L140 285"/><line x1="118" y1="40" x2="118" y2="285"/>
    <path d="M104 120 H132 M106 175 H130 M108 230 H128 M110 262 H126"/>
    <path d="M140 285 L162 90 L184 285"/><line x1="162" y1="90" x2="162" y2="285"/>
    <path d="M148 165 H176 M150 215 H174 M152 255 H172"/>
    <line x1="20" y1="285" x2="190" y2="285"/>
  </g>
  <g fill="#141414" stroke="none">
    <circle cx="44" cy="120" r="2.4"/><circle cx="80" cy="70" r="2.8"/>
    <circle cx="118" cy="40" r="3.2"/><circle cx="162" cy="90" r="2.8"/>
  </g>
</svg>`;

function currentPath(){
  let p = location.pathname;
  if (p.endsWith("/index.html")) p = p.slice(0, -10);
  if (p === "") p = "/";
  return p;
}

function buildSidebar(){
  const el = document.getElementById("sidebar");
  if (!el) return;
  const cur = currentPath();
  const links = NAV.map(n => {
    const active = (n.href === cur) || (n.href !== "/" && cur.indexOf(n.href) === 0);
    return `<li><a href="${n.href}" class="${active ? "active" : ""}">${n.label}</a></li>`;
  }).join("");
  el.className = "sidebar";
  el.innerHTML =
    `<div class="brand"><div class="name">${TITLE}</div></div>
     <div class="rule"></div>
     <ul class="nav">${links}</ul>
     <div class="sagrada">${SAGRADA}<div class="cap">Sagrada Fam&iacute;lia</div></div>`;
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

document.addEventListener("DOMContentLoaded", () => { buildSidebar(); wireFilters(); });
