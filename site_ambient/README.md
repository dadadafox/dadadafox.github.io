# Super Awareness — 使い方

白黒・サイドバー付きの静的サイト一式です。GitHub Pages にそのまま置くだけで動きます。
（Jekyll などの変換は使いません。`.nojekyll` を同梱しているので、ファイルがそのまま表示されます）

## 入っているもの
- `index.html` … Intro ページ（トップ）
- `personal.html` / `seeds.html` / `person.html` … 各ページ
- `style.css` … 全ページ共通の見た目（色はここで変えられます）
- `site.js` … サイドバー（タイトル・メニュー・サグラダ）を全ページに表示。seeds の絞り込みもここ
- `_template.html` … 新しいページを作るときの雛形
- `.nojekyll` … 純粋な静的サイトとして公開するための印（消さないでください）

---

## 1. 公開する（既存のリポジトリに入れる）
すでにある `dadadafox.github.io` リポジトリに入れます。

1. 前のテスト用ファイル（`index.md`、`_config.yml`、`01_business_ideas` などの古いフォルダ）は削除してください
2. この一式（`index.html` など。フォルダごと）をリポジトリにアップロード → Commit
3. 数分後 `https://dadadafox.github.io/` で表示されます
   - 反映されないときは Settings → Pages で Branch が `main` になっているか確認

---

## 2. 新しいページを追加する（← これが「ページを作っていく」手順）
1. `_template.html` をコピーして、好きな名前で保存（例：`research.html`）
2. 中の `<title>` と `<h1>` をそのページ名に書き換え、本文を書く
3. `site.js` の `NAV` に1行足す。例：
   ```js
   { label: "Research", href: "/research.html" },
   ```
   → これだけで、全ページのサイドバーに「Research」が出ます（毎回サイドバーを書き直す必要はありません）

## 3. seeds にメモ（ラベル付き）を追加する
`seeds.html` の中の `<li class="entry" ...>` ブロックを1つコピーして、
- `data-cat="business"` … ラベル名
- 日付・タイトル・説明

を書き換えます。**新しいラベルを増やしたいとき**は、`<div class="filters">` の中に
`<span class="chip" data-f="新ラベル">新ラベル</span>` を1つ足してください。

---

## 4. よくある変更
- **タイトルを変える** … `site.js` の `TITLE`
- **色を変える** … `style.css` の先頭 `:root { ... }`
- **サグラダを別案（2 や 3）に差し替える** … `site.js` の `SAGRADA` の中身を入れ替え
  （案2・案3のSVGが必要なときは声をかけてください、お渡しします）

## メモ
- メニューの `personal` と `person` は名前が似ています。片方を別のもの（research / about / people など）にしたい場合は、`site.js` の `NAV` の該当行と、そのページ名を変えれば区別できます。
