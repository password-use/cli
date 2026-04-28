# password-use CLI (한국어)

`password-use` 는 결정론적 비밀번호 생성 CLI 도구입니다.  
**완전 오프라인으로 동작하며, 네트워크에 의존하지 않고 모든 처리는 로컬 클라이언트에서 수행됩니다.**

## 언어

- 🇺🇸 [English](./README.md)
- 🇨🇳 [中文](./README.zh-CN.md)
- 🇫🇷 [Francais](./README.fr.md)
- 🇯🇵 [日本語](./README.ja.md)
- 🇰🇷 한국어
- 🇩🇪 [Deutsch](./README.de.md)
- 🇪🇸 [Espanol](./README.es.md)
- 🇵🇹 [Portugues](./README.pt.md)

## 설치 (전역 명령)

npm 으로 전역 설치:

```bash
npm install -g @password-use/password-use
```

설치 후 전역 명령 사용:

```bash
password-use --help
```

## 기능

- 니모닉 + 마스터 비밀번호 기반의 재현 가능한 비밀번호 생성 및 회전
- seed 로컬 암호화 저장 (서버 업로드 없음)
- Uses cryptocurrency-grade encryption technology
- `normal / strong / number` 강도 지원
- 기본적으로 클립보드에 복사 (`--print` 는 평문만 출력하고 클립보드에는 복사하지 않음)

## 자주 사용하는 명령

```bash
password-use init
password-use import
password-use list
password-use generate
password-use show
password-use rotate
```
