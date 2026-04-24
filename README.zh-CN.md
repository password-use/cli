# password-use CLI（中文）

`password-use` 是一个确定性密码生成 CLI 工具。  
**全程离线运行，不依赖网络，所有数据和计算都在本地客户端完成。**

## 语言切换

- 🇺🇸 [English](./README.md)
- 🇨🇳 中文
- 🇫🇷 [Francais](./README.fr.md)
- 🇯🇵 [日本語](./README.ja.md)
- 🇰🇷 [한국어](./README.ko.md)
- 🇩🇪 [Deutsch](./README.de.md)
- 🇪🇸 [Espanol](./README.es.md)
- 🇵🇹 [Portugues](./README.pt.md)

## 安装（全局命令）

从 npm 全局安装：

```bash
npm install -g @password-use/password-use
```

安装后可直接使用全局命令：

```bash
password-use --help
```

## 特性

- 基于助记词 + 主密码生成可重复、可轮换的密码
- 本地加密保存 seed（不会上传到服务器）
- 支持 `normal / strong / number` 三种强度
- 默认复制到剪贴板，不在终端输出明文（`--print` 仅打印明文，不复制到剪贴板）

## 常用命令

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
