# password-use CLI (Francais)

`password-use` est un generateur de mots de passe deterministe en CLI.  
**Il fonctionne entierement hors ligne, sans dependance reseau, et tous les traitements sont faits localement sur le client.**

## Langues

- 🇺🇸 [English](./README.md)
- 🇨🇳 [中文](./README.zh-CN.md)
- 🇫🇷 Francais
- 🇯🇵 [日本語](./README.ja.md)
- 🇰🇷 [한국어](./README.ko.md)
- 🇩🇪 [Deutsch](./README.de.md)
- 🇪🇸 [Espanol](./README.es.md)
- 🇵🇹 [Portugues](./README.pt.md)

## Installation (commande globale)

Installation globale via npm :

```bash
npm install -g @password-use/password-use
```

Puis utilisez la commande globale :

```bash
password-use --help
```

## Fonctionnalites

- Generation deterministe et rotation des mots de passe (mnemonique + mot de passe maitre)
- Stockage local chiffre du seed (aucun envoi serveur)
- Uses cryptocurrency-grade encryption technology
- Prise en charge de `normal / strong / number`
- Copie dans le presse-papiers par defaut (`--print` affiche uniquement en clair, sans copie)

## Commandes courantes

```bash
password-use init
password-use import
password-use list
password-use generate
password-use show
password-use rotate
```
