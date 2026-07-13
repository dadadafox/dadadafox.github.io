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

/* --- 詳細ページ：タブ切り替え --- */
function wireTabs(){
  const tabs = document.querySelectorAll(".tab");
  if (!tabs.length) return;
  tabs.forEach(t => t.addEventListener("click", () => {
    const id = t.dataset.tab;
    document.querySelectorAll(".tab").forEach(x => x.classList.toggle("on", x === t));
    document.querySelectorAll(".tabpane").forEach(p => p.classList.toggle("on", p.dataset.tab === id));
  }));
}

/* --- 詳細ページ：目次を最初のタブの見出しから自動生成 --- */
function buildToc(){
  const toc = document.getElementById("toc");
  if (!toc) return;
  const pane = document.querySelector(".tabpane") || document.querySelector(".idea");
  const hs = pane ? pane.querySelectorAll("h2") : [];
  let html = '<div class="h">Contents</div>';
  hs.forEach((h, i) => {
    if (!h.id) h.id = "s" + (i + 1);
    const label = h.dataset.toc || h.textContent.trim();
    html += `<a href="#${h.id}">${label}</a>`;
  });
  toc.innerHTML = html;
}

/* --- Person: 顔画像の自動表示（無ければ頭文字アバター） --- */
function buildPortrait(){
  const slot = document.getElementById("portrait");
  if (!slot) return;
  const src = document.body.dataset.portrait;      // 例: /portraits/gaudi.jpg
  const initial = document.body.dataset.initial || "";
  const fallback = () => { slot.innerHTML = `<div class="portrait-fallback">${initial}</div>`; };
  if (src) {
    const img = new Image();
    img.className = "portrait";
    img.alt = "";
    img.onload = () => { slot.innerHTML = ""; slot.appendChild(img); };
    img.onerror = fallback;   // 画像がまだ無い/読めないときは頭文字
    img.src = src;
  } else {
    fallback();
  }
}

/* --- Person 一覧：各人のアバター（画像があれば画像、無ければ頭文字） --- */
function buildPersonAvatars(){
  document.querySelectorAll(".entry.person").forEach(e => {
    const slot = e.querySelector(".avatar");
    if (!slot) return;
    const initial = e.dataset.initial || "";
    const src = e.dataset.portrait;
    slot.textContent = initial;
    if (src) {
      const img = new Image();
      img.onload = () => { slot.textContent = ""; slot.style.backgroundImage = `url(${src})`; };
      img.src = src;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildHead(); wireFilters(); wireTabs(); buildToc(); buildPortrait(); buildPersonAvatars();
});
