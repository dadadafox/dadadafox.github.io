# Super Awareness — 使い方（中央タイトル＋横メニュー版）

白黒・situational-awareness 風の静的サイト一式です。GitHub Pages にそのまま置くだけで動きます。
（`.nojekyll` 同梱。Jekyll 変換は使いません）

## 入っているもの
- `index.html` … Intro（トップ）
- `personal.html` … Personal
- `seeds.html` … Seeds（ラベルで絞り込めるメモ一覧）
- `person.html` … Person（人物の一覧）
- `gaudi.html` … 人物記事の例（アントニ・ガウディ）
- `style.css` … 全ページ共通の見た目（色はここ）
- `site.js` … 中央タイトルと横メニューを全ページに表示。seeds の絞り込みもここ
- `_template.html` … 新しい記事を作るときの雛形
- `.nojekyll` … 静的サイトとして公開する印（消さない）

---

## 公開（既存リポジトリに入れる）
この一式のファイルを**リポジトリの一番上（ルート）**にアップロード → Commit。
同名ファイルは上書きされ、`gaudi.html` が新しく追加されます。

## Person に人物を追加する（← これがメインの追加作業）
1. `_template.html` をコピーして、その人の名前でファイルを作る（例：`dali.html`）
2. 中の `<title>` `<h1>` `<div class="byline">` と本文を書き換える
   （`data-section="person"` はそのまま＝Person メニューが選ばれた状態になる）
3. `person.html` の一覧に、その人への行を1つ足す：
   ```html
   <li class="entry">
     <h2><a href="/dali.html">Salvador Dalí</a></h2>
     <p class="desc">画家 · 1904–1989</p>
   </li>
   ```
これで Person 一覧に並び、クリックすると記事が開きます。何人でも同じ手順で増やせます。

## Seeds にメモを追加する
`seeds.html` の `<li class="entry" data-cat="...">` を1つコピーして書き換え。
新しいラベルは、上の `<span class="chip" data-f="...">` を1つ足す。

## その他
- **メニューを増やす** … `site.js` の `NAV` に1行追加
- **タイトルを変える** … `site.js` の `TITLE`
- **色を変える** … `style.css` の `:root`
- **サグラダを別案に** … `site.js` の `SAGRADA` を差し替え（別案が必要なら声をかけてください）
