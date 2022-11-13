# 2022-2 소공개 12팀 백엔드

## Development

```bash
> git clone https://github.com/hegria/2022fall_42class_team12
> cd 2022fall_42class_team12/backend
> npm install
> npm run start
```

### DB 관련 사항

1. 로컬 DB 계정 이름과 password에 맞게 backend/config/config.json 수정
2. 안현준(@NthreeAhn) 혹은 강대호(@Kangdyu) 에게 연락, `.env` 파일 받기 (JWT Secret 및 AWS Key가 포함되어있음. 절대 공개 금지)
3. 로컬 DB에 database는 생성되어 있어야함(config.json의 database 이름 말하는 것)
4. backend/app.js에 sequelize가 db를 sync하는 게 있는데 여기서 옵션이 force: true면 기존 db가 다 날라간다.
5. 만약, 더 이상 db 스키마를 바꿀 일이 없을 것 같고, db 데이터를 다 날리기 싫다면 force: false로 변경 후 진행해야 함.
