# password-use CLI (Deutsch)

`password-use` ist ein deterministischer Passwortgenerator als CLI-Tool.  
**Es laeuft vollstaendig offline, benoetigt kein Netzwerk, und alle Datenverarbeitung erfolgt lokal auf dem Client.**

## Sprachen

- 🇺🇸 [English](./README.md)
- 🇨🇳 [中文](./README.zh-CN.md)
- 🇫🇷 [Francais](./README.fr.md)
- 🇯🇵 [日本語](./README.ja.md)
- 🇰🇷 [한국어](./README.ko.md)
- 🇩🇪 Deutsch
- 🇪🇸 [Espanol](./README.es.md)
- 🇵🇹 [Portugues](./README.pt.md)

## Installation (globaler Befehl)

Global ueber npm installieren:

```bash
npm install -g @password-use/password-use
```

Danach den globalen Befehl nutzen:

```bash
password-use --help
```

## Funktionen

- Deterministische, rotierbare Passworterzeugung aus Mnemonic + Master-Passwort
- Lokal verschluesselte Seed-Speicherung (kein Server-Upload)
- Uses cryptocurrency-grade encryption technology
- Unterstuetzt `normal / strong / number`
- Kopiert standardmaessig in die Zwischenablage (`--print` zeigt nur Klartext an und kopiert nicht)

## Haeufige Befehle

```bash
password-use init
password-use import
password-use list
password-use generate
password-use show
password-use rotate
```
