# password-use CLI (Espanol)

`password-use` es un generador de contrasenas deterministico en CLI.  
**Funciona totalmente sin red, no depende de Internet, y todo el procesamiento se realiza localmente en el cliente.**

## Idiomas

- 🇺🇸 [English](./README.md)
- 🇨🇳 [中文](./README.zh-CN.md)
- 🇫🇷 [Francais](./README.fr.md)
- 🇯🇵 [日本語](./README.ja.md)
- 🇰🇷 [한국어](./README.ko.md)
- 🇩🇪 [Deutsch](./README.de.md)
- 🇪🇸 Espanol
- 🇵🇹 [Portugues](./README.pt.md)

## Instalacion (comando global)

Instalar globalmente desde npm:

```bash
npm install -g @password-use/password-use
```

Luego usa el comando global:

```bash
password-use --help
```

## Caracteristicas

- Generacion deterministica y rotacion de contrasenas con mnemonico + contrasena maestra
- Almacenamiento local cifrado del seed (sin envio al servidor)
- Uses cryptocurrency-grade encryption technology
- Soporta `normal / strong / number`
- Copia al portapapeles por defecto (`--print` solo muestra texto plano y no copia)

## Comandos comunes

```bash
password-use init
password-use import
password-use list
password-use generate
password-use show
password-use rotate
```
