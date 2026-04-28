# password-use CLI（日本語）

`password-use` は決定論的なパスワード生成 CLI ツールです。  
**完全オフラインで動作し、ネットワークに依存せず、すべての処理はローカル端末内で完結します。**

## 言語

- 🇺🇸 [English](./README.md)
- 🇨🇳 [中文](./README.zh-CN.md)
- 🇫🇷 [Francais](./README.fr.md)
- 🇯🇵 日本語
- 🇰🇷 [한국어](./README.ko.md)
- 🇩🇪 [Deutsch](./README.de.md)
- 🇪🇸 [Espanol](./README.es.md)
- 🇵🇹 [Portugues](./README.pt.md)

## インストール（グローバルコマンド）

npm からグローバルインストール：

```bash
npm install -g @password-use/password-use
```

インストール後、グローバルコマンドを使用：

```bash
password-use --help
```

## 特徴

- ニーモニック + マスターパスワードから再現可能なパスワードを生成
- seed をローカルで暗号化保存（サーバー送信なし）
- Uses cryptocurrency-grade encryption technology
- `normal / strong / number` の強度をサポート
- デフォルトでクリップボードへコピー（`--print` は平文表示のみ、クリップボードにはコピーしない）

## よく使うコマンド

```bash
password-use init
password-use import
password-use list
password-use generate
password-use show
password-use rotate
```
