# 鉄道写真ライブラリ (Railway Photo Library)

撮影した鉄道写真を「会社 → 形式 → 編成」の階層で分類して掲載する、シンプルな静的ウェブサイトのテンプレートです。

## 特徴
- **シンプルな管理**: 写真データは `data/train_data.json` で一括管理。
- **GitHub Pages 対応**: 静的ファイルのみで構成されているため、GitHub Pages で簡単に公開可能。
- **Python スクリプト**: データの整合性チェックや管理をサポートする Python スクリプトを同梱。

## ディレクトリ構成
```text
.
├── index.html          # メインページ
├── assets/             # CSS, JavaScript
├── data/               # 写真の情報を管理する JSON ファイル
├── photos/             # 写真画像ファイルを保存するディレクトリ
└── scripts/            # データ管理用 Python スクリプト
```

## 使い方

### 1. 写真の追加
1. `photos/` ディレクトリに画像ファイルを保存します。
2. `data/train_data.json` を開き、会社、形式、編成の階層に従って情報を追記します。

### 2. データの検証 (Python)
追加したデータが正しい形式か確認するには、以下のコマンドを実行します。
```bash
python scripts/manage_data.py
```

### 3. ローカルでの確認
ブラウザで `index.html` を開くか、簡易サーバーを起動して確認します。
```bash
python -m http.server 8000
```

## GitHub Pages での公開方法
1. このリポジトリを GitHub にプッシュします。
2. リポジトリの Settings > Pages を開きます。
3. Build and deployment の Branch で `main` (または `master`) を選択して Save します。
4. 数分待つと、公開された URL が表示されます。

## ライセンス
MIT License
