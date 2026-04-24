# password-use CLI

**password-use** is a deterministic password generator CLI.  
**It runs fully offline, requires no network, and all data processing happens on your local device.**

## Languages

- 🇺🇸 English (default)
- 🇨🇳 [中文](./README.zh-CN.md)
- 🇫🇷 [Francais](./README.fr.md)
- 🇯🇵 [日本語](./README.ja.md)
- 🇰🇷 [한국어](./README.ko.md)
- 🇩🇪 [Deutsch](./README.de.md)
- 🇪🇸 [Espanol](./README.es.md)
- 🇵🇹 [Portugues](./README.pt.md)

## Installation (Global Command)

Install globally from npm:

```bash
npm install -g @password-use/password-use
```

Then use the global command directly:

```bash
password-use --help
```

## Features

- Deterministic, rotatable password generation from mnemonic + master password
- Local encrypted seed storage (no server upload)
- Supports `normal / strong / number` strengths
- Copies password to clipboard by default (`--print` displays plaintext only and skips clipboard)

## Common Commands

```bash
password-use init
password-use import
password-use list
password-use logout
password-use language
password-use language zh-CN
password-use generate
password-use show
password-use rotate
```
