# password-use CLI (Portugues)

`password-use` e um gerador de senhas deterministico em CLI.  
**Funciona totalmente offline, sem dependencia de rede, e todo o processamento ocorre localmente no cliente.**

## Idiomas

- 🇺🇸 [English](./README.md)
- 🇨🇳 [中文](./README.zh-CN.md)
- 🇫🇷 [Francais](./README.fr.md)
- 🇯🇵 [日本語](./README.ja.md)
- 🇰🇷 [한국어](./README.ko.md)
- 🇩🇪 [Deutsch](./README.de.md)
- 🇪🇸 [Espanol](./README.es.md)
- 🇵🇹 Portugues

## Instalacao (comando global)

Instale globalmente via npm:

```bash
npm install -g @password-use/password-use
```

Depois use o comando global:

```bash
password-use --help
```

## Recursos

- Geracao deterministica e rotacao de senhas com mnemotecnico + senha mestra
- Armazenamento local criptografado do seed (sem envio para servidor)
- Uses cryptocurrency-grade encryption technology
- Suporte a `normal / strong / number`
- Copia para a area de transferencia por padrao (`--print` apenas mostra texto em claro e nao copia)

## Comandos comuns

```bash
password-use init
password-use import
password-use list
password-use generate
password-use show
password-use rotate
```
