# 2022-2 소공개 12팀 프론트엔드

## Development

```bash
> git clone https://github.com/hegria/2022fall_42class_team12
> cd 2022fall_42class_team12
> cd frontend
> npm install
> npm run dev
```

<b>(vscode) 개발 시작 전 prettier, eslint extension 설치하기</b>

## Project Structure

```
frontend/
ㄴ .husky/         # pre-commit을 위한 husky 라이브러리 세팅 폴더. npm install 시 생깁니다.
ㄴ .next/          # npm run dev 혹은 npm build 시 빌드된 결과물이 담긴 폴더입니다.
ㄴ node_modules/   # npm install 명령어로 설치된 라이브러리가 모여있는 폴더입니다.
ㄴ public/         # 정적 사진, 아이콘, 폰트 등을 담는 폴더입니다.
ㄴ src/            # 작성된 코드를 담는 폴더입니다.
    ㄴ components/     # 컴포넌트 파일들을 담는 폴더입니다.
        ㄴ common/     # 여러 페이지에서 공통적으로 사용되는 컴포넌트들을 담는 폴더입니다.
        ㄴ pages/      # 특정 페이지에서 사용되는 컴포넌트들을 담는 폴더입니다.
            ㄴ home/       # 메인 페이지에서 사용되는 컴포넌트들을 담는 폴더입니다.
                ㄴ sections/    # 메인 페이지에서 사용되는 섹션들을 담는 폴더입니다. (src/pages/index.js 참고)
            ㄴ recruitments/
            ㄴ ...
    ㄴ constants/      # 프로젝트에서 사용되는 여러 상수들을 담는 폴더입니다.
        ㄴ mockups/        # API가 완성되기 전 레이아웃 테스트를 위해 사용되는 목업 데이터(더미 데이터)를 담는 폴더입니다.
    ㄴ pages/          # Next.js의 라우팅을 사용하는 페이지 컴포넌트들을 담는 폴더입니다.
        ㄴ _app.js         # 모든 페이지 컴포넌트의 부모 컴포넌트입니다.
        ㄴ index.js        # 메인 페이지 (/) 입니다.
        ㄴ recruitment/
            ㄴ index.js        # 모집글 리스트 페이지 (/recruitment) 입니다.
            ㄴ [id].js         # 모집글 상세 페이지 (/recruitment:id) 입니다.
        ㄴ ... 위 예시가 충분하지 않다면 next.js 공식 문서를 참고해주세요.
    ㄴ styles/         # 스타일 관련 코드들을 담는 폴더입니다.
ㄴ ... 기타 프로젝트 설정 파일들
```
