# 프로젝트 개요

## 목적

이 프로젝트는 학습법의 한계를 극복하기 위해 만들어진 웹 애플리케이션으로, 개발자가 기억하고 있는 키워드의 내용을 쉽게 풀어서 공유할 수 있습니다. 직관적인 사용자 경험을 제공하며, 개발자의 경험과 지식을 공유하는데 초점을 맞춤

<br />

## 핵심 기능

- **Notion 블로그 포스팅**: 개발자가 Notion에서 작성한 마크다운 형식의 글을 가져와서 게시할 수 있습니다. 이를 통해 작성한 글을 빠르게 공유가능
- **개인 프로필 페이지**: 개발자의 이력서 및 자기소개를 표시하는 개인 프로필 섹션을 제공합니다. 이를 통해 개발자의 정보를 알 수 있음
- **태그 기반 분류**: 작성된 게시물을 태그를 통해 분류하고 관리할 수 있습니다. 이를 통해 사용자들이 관심 있는 주제를 쉽게 찾을 수 있음
- **반응형 디자인**: 모바일 및 데스크톱 환경에서 모두 최적화된 사용자 경험을 제공합니다. 이를 통해 사용자가 어느 기기에서든 원활하게 이용가능
- **검색 기능:** 사용자가 원하는 주제나 키워드를 통해 관련 게시물을 검색할 수 있는 기능을 제공합니다. 이를 통해 사용자는 빠르게 필요한 정보를 찾을 수 있음
- **댓글 시스템**: 사용자들이 게시물에 댓글을 달아 의견을 공유하고 토론할 수 있는 기능을 제공합니다. 이를 통해 사용자들 사이의 상호작용이 활성화 가능

<br />

## 프로젝트 실행 방법

1. 프로젝트 가져오기

```shell
$ git clone https://github.com/Plu457/notion-api-blog
```

2. 의존성 패키지 설치

```shell
$ yarn install or yarn
```

3. .env.local 파일 추가

```shell
NEXT_PUBLIC_ANALYTICS_ID=구글 에널리틱스 id
SITE_URL=사이트 주소
PROFILE_ID=노션 이력서 주소
NOTION_TOKEN=노션 토큰
DATABASE_ID=노션 데이터베이스 id
```

4. 프로젝트 실행

```shell
yarn dev
```

<br />

## [배포링크](https://www.plu457.life)

<br />

## [개발문서 (작성중)](https://www.plu457.life/blog/731e649a-b820-4d4a-b3fb-8d3d57532e20)

<br />

# [블로그 관련 게시글](https://www.plu457.life/blog?page=1&q=PROJECT)

<br />
<br />

# 개발 스택

### 주요 라이브러리와 프레임워크

- Next.js : SSG와 ISR 기법을 사용하여 사용자에게 높은 성능과 좋은 경험을 제공하기 위해 사용
- TypeScript : 코드의 안정성과 유지보수성을 높이기 위해 사용
- Sass : React-Notion-X 라이브러리의 NotionRenderer 컴포넌트에서 스타일을 작업할 때, 공식 문서에서 Sass를 권장하므로 NotionRenderer 컴포넌트에서만 Sass를 사용하여 작업
- Tailwind CSS : 이미 정의된 디자인 시스템을 활용하고, 일관된 디자인을 유지하며 개발 속도를 향상시키기 위해 사용
- Framer Motion : 간편한 애니메이션 처리와 자연스러운 모션 효과를 제공하여 사용자 경험을 향상시키기 위해 사용
- Notion API : Notion 데이터를 손쉽게 가져와서 블로그 게시글을 생성하고 관리하기 위해 사용
- React-Notion-X : Notion 페이지를 렌더링하기 위해, Notion API와 함께 빠르고 유연한 Notion 페이지 커스터마이징을 위해 React-Notion-X를 사용
- React Icons: 간편하게 아이콘을 사용하기 위해 사용
- LQIP(Modern) : 이미지 로딩 성능을 개선하고, 사용자 경험을 향상시키기 위해 사용
- Giscus : 다른 댓글 라이브러리와 비교하여 디자인이 깔끔하기 때문에 사용

<br />
<br />

# 폴더 구조

```jsx
📦pages // 페이지 레벨의 React 컴포넌트들
 ┣ 📂api // 서버리스 함수
 ┣ 📂blog // 블로그 관련 페이지
 ┣ 📂profile // 프로필 페이지
 ┣ 📜404.tsx
 ┣ 📜_app.tsx
 ┣ 📜index.tsx
 ┗ 📜search.tsx

📦src
 ┣ 📂assets // 프로젝트에서 사용하는 자원 (예: 폰트, 이미지).
 ┣ 📂cms // 외부에서 데이터를 가져오는 코드
 ┣ 📂commons // 공통으로 사용하는 설정, 상수 데이터, 이미지 등
 ┣ 📂components // 재사용 가능한 React 컴포넌트
 ┃ ┣ 📂Card // 카드 컴포넌트
 ┃ ┣ 📂Layout // 레이아웃 관련 컴포넌트
 ┃ ┣ 📂Tags // 태그 관련 컴포넌트
 ┃ ┣ 📜HeadMeta.tsx
 ┃ ┣ 📜HeroContent.tsx
 ┃ ┣ 📜LoadingSpinner.tsx
 ┃ ┣ 📜NotionPageRenderer.tsx
 ┃ ┣ 📜Pagination.tsx
 ┃ ┗ 📜ToTopButton.tsx
 ┃ ┃
 ┣ 📂hooks // 커스텀 훅
 ┣ 📂styles // 전역 스타일 및 Notion 스타일
 ┣ 📂types // 프로젝트 전체 및 공통으로 사용되는 타입
 ┣ 📂utils // 프로젝트에서 공통으로 사용되는 함수
 ┗ 📂views // 페이지 레벨의 뷰 컴포넌트
 ┃ ┣ 📂Blog // 블로그 관련 뷰 컴포넌트
 ┃ ┃ ┣ 📂BlogDetailView
 ┃ ┗ 📜SearchView.tsx
```

---

<br />
<br />

# 코드 스타일 가이드

## .prettierrc

```jsx
{
  "singleQuote": true, // 작은 따옴표 사용
  "semi": true, // 문장 끝에 세미콜론 사용
  "useTabs": false,
  "tabWidth": 2, // 들여쓰기 2칸
  "trailingComma": "all", // 객체와 배열의 마지막 요소에 쉼표 사용
  "printWidth": 100, // 100자 제한
  "arrowParens": "avoid" // 가능하면 화살표 함수 괄호 생략
}
```

<br />

## 확장자

- cms / commons / hooks / utils / types 폴더 하위 : **`.ts`**
- pages / components / views 폴더 하위 : **`.tsx`**

<br />

## 네이밍 컨벤션

- 상수데이터 : **`UPPER_CASE_SNAKE_CASE`**
- 변수이름(일반) / 함수 : **`camelCase`**
- 공용컴포넌트 : **`PascalCase`**

<br />

## 커밋 메세지 작성법

| 태그         | 설명                                                  |
| ------------ | ----------------------------------------------------- |
| `Feat: `     | 새로운 기능을 추가할 경우                             |
| `Fix: `      | 버그를 고친 경우                                      |
| `Design: `   | CSS 등 사용자 UI 디자인 변경                          |
| `HOTFIX: `   | 급하게 치명적인 버그를 고쳐야하는 경우                |
| `Style: `    | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우 |
| `Refactor: ` | 프로덕션 코드 리팩토링                                |
| `Comment: `  | 필요한 주석 추가 및 변경                              |
| `Docs: `     | 문서를 수정한 경우                                    |
| `Rename: `   | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우    |
| `Remove: `   | 파일을 삭제하는 작업만 수행한 경우                    |
