# @justkits/svg2tsx converter 동작 방식

svg2tsx CLI에서 SVG → React 컴포넌트로 자동 변환하는 기능을 담당하는 코어 로직에 대한 간단한 설명

## 목차

- [핵심 기능](#-핵심-기능)
- [워크플로우](#-워크플로우)
- [매니페스트 파일](#-매니페스트-파일)
- [사용 가능한 빌더](#-사용-가능한-빌더)

## 📘 핵심 기능

본 CLI 프로그램의 converter는 SVGR을 기반으로 SVG 파일을 React 컴포넌트(`.tsx`)로 자동 변환하는 빌더 시스템을 담당한다. 핵심 기능은 아래와 같다:

- ✅ **자동 변환**: SVG 파일을 TypeScript React 컴포넌트로 자동 변환
- ✅ **중복 검증**: 컴포넌트 이름 및 SVG 내용 중복 자동 감지
- ✅ **병렬 처리**: 대량의 SVG 파일을 효율적으로 처리
- ✅ **커스터마이징**: 템플릿 및 SVGR 옵션 완전 커스터마이징 가능
- ✅ **플랫폼 독립적**: 옵션을 설정하여 Web과 React Native 모두 지원 가능
- ✅ **배럴 파일 생성**: 옵션 설정을 통해 자동으로 `index.ts` 배럴 파일 생성 가능

## 🔄 워크플로우

`generate` 워크플로우 내부에서는 다음 순서로 변환이 실행된다:

1. **Clean**: `.svg2tsx/manifest.json`에 기록된 이전 생성 파일만 선택적으로 삭제 (매니페스트에 없는 파일은 보존)
2. **Process**: 입력 디렉토리(기본: `assets/`)의 모든 SVG 파일을 스캔하고 변환
3. **Generate Barrels**: `index.ts` 배럴 파일 자동 생성 (설정 시)
4. **Summary**: 변환 결과 요약 출력

> 입출력 디렉토리는 `assetsDir`과 `srcDir` 옵션으로 커스터마이징할 수 있다. 자세한 내용은 [설정 문서](./settings.md)를 참고한다.

## 📋 매니페스트 파일

svg2tsx는 생성된 파일을 추적하기 위해 프로젝트 루트(`baseDir`)에 `.svg2tsx/manifest.json` 파일을 생성한다.

### 역할

- 다음 `generate` 실행 시, 매니페스트에 기록된 파일만 선택적으로 삭제한다 (Clean 단계).
- 매니페스트에 없는 파일(예: 직접 작성한 `types.ts`)은 삭제되지 않는다.
- 출력 디렉토리(`srcDir`) 외부의 파일은 매니페스트에 포함되어 있어도 삭제되지 않는 안전장치가 있다.

### 형식

매니페스트는 `baseDir` 기준 상대 경로의 JSON 배열이다.

```json
[
  "src/media/Album.tsx",
  "src/media/Video.tsx",
  "src/media/index.ts",
  "src/index.ts"
]
```

### 버전 관리

`.svg2tsx/` 디렉토리를 `.gitignore`에 추가하는 것을 권장한다. 매니페스트가 없으면 Clean 단계를 건너뛰고 새로 생성하므로 문제가 없다. 다만, 상대 경로를 사용하므로 커밋해도 환경에 관계없이 정상 동작한다.

## 🚀 사용 가능한 빌더

### 1. FamilySvgBuilder

카테고리별로 분류된 아이콘 세트에 적합한 빌더.

**디렉토리 구조:**

```text
assets/
  ├── media/
  │   ├── album.svg
  │   ├── video.svg
  │   └── upload.svg
  ├── app/
  │   ├── settings.svg
  │   └── chevron-down.svg
```

**생성 결과:**

```text
src/
  ├── media/
  │   ├── Album.tsx
  │   ├── Video.tsx
  │   ├── Upload.tsx
  │   └── index.ts          // export { Album, Video, Upload }
  ├── app/
  │   ├── Settings.tsx
  │   ├── ChevronDown.tsx
  │   └── index.ts
  └── index.ts              // export { Album, Video, ... } from "./media"
```

### 2. StandaloneSvgBuilder

플랫 구조의 아이콘 세트에 적합한 빌더.

**디렉토리 구조:**

```text
assets/
  ├── album.svg
  ├── video.svg
  ├── settings.svg
  └── twitter.svg
```

**생성 결과:**

```text
src/
  ├── Album.tsx
  ├── Video.tsx
  ├── Settings.tsx
  ├── Twitter.tsx
  └── index.ts              // export { Album, Video, Settings, Twitter }
```
