# Firebase

## Cloud Functions로 Firebase 인증 확장

- 프로젝트 설정 > 서비스 게정 > 비공개 키 생성
- functions/key.json

### 사용자 생성 시 함수 트리거
```
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  // ...
});
```

### 사용자 생성 시 함수 트리거
```
exports.sendByeEmail = functions.auth.user().onDelete((user) => {
  // ...
});
```

### 프로젝트 환경구성 설정
```
firebase functions:config:set admin.email="xxx@xxx.com" admin.db_url=https://xxx.site.firebase.com
```
```
//firebase functions:config:get

{
  "someservice": {
    "key":"THE API KEY",
    "id":"THE CLIENT ID"
  }
}
```