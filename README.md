# Firebase

## Cloud Functions로 Firebase 인증 확장

- 프로젝트 설정 -> 비공개 키 생성

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

