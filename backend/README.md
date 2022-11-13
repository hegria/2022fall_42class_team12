# 2022-2 소공개 12팀 백엔드

## Development

```bash
> git clone https://github.com/hegria/2022fall_42class_team12
> cd 2022fall_42class_team12/backend
> npm install
> npm run start
```
---
### DB 관련 사항

1. 로컬 DB 계정 이름과 password에 맞게 backend/config/config.json 수정
2. 안현준(@NthreeAhn) 혹은 강대호(@Kangdyu) 에게 연락, `.env` 파일 받기 (JWT Secret 및 AWS Key가 포함되어있음. 절대 공개 금지)
3. 로컬 DB에 database는 생성되어 있어야함(config.json의 database 이름 말하는 것)
4. backend/app.js에 sequelize가 db를 sync하는 게 있는데 여기서 옵션이 force: true면 기존 db가 다 날라간다.
5. 만약, 더 이상 db 스키마를 바꿀 일이 없을 것 같고, db 데이터를 다 날리기 싫다면 force: false로 변경 후 진행해야 함.
---
---

## Project Structure

```
backend/
ㄴ config/         # DB 접속을 위한 DB 설정 정보가 들어있는 폴더입니다.
ㄴ models/         # sequelize 라이브러리 연동을 위한 DB 스키마 설정 관련 코드가 있는 폴더입니다.
ㄴ node_modules/   # npm install 명령어로 설치된 라이브러리가 모여있는 폴더입니다.
ㄴ routes/         # 백엔드 api 메소드를 구현한 코드가 있는 폴더입니다.
ㄴ utils/          # 백엔드 구현 중 사용했던 AWS s3와 multer 연동 코드가 있는 폴더입니다.
ㄴ app.js          # 백엔드 서버 실행을 위한 파일입니다.
```
