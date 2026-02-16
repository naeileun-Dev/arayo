# 아라요 기계장터 - React Native App

아라요 기계장터 모바일 앱 프로젝트 (TypeScript)

## 📁 프로젝트 구조

```
arayo-app/
├── App.tsx                     # 앱 메인 컴포넌트
├── index.js                    # 엔트리 포인트
├── app.json                    # 앱 설정
├── package.json
├── tsconfig.json               # TypeScript 설정
├── babel.config.js
├── metro.config.js
│
└── src/
    ├── types/                  # 타입 정의
    │   └── index.ts
    │
    ├── components/             # 재사용 컴포넌트
    │   ├── common/             # 공통 컴포넌트
    │   │   ├── Button.tsx
    │   │   ├── Input.tsx
    │   │   ├── Checkbox.tsx
    │   │   ├── Header.tsx
    │   │   ├── TabBar.tsx
    │   │   └── index.ts
    │   │
    │   └── auth/               # 인증 관련 컴포넌트
    │       ├── SocialLoginButton.tsx
    │       ├── AgreementItem.tsx
    │       └── index.ts
    │
    ├── screens/                # 화면
    │   └── auth/
    │       ├── LoginScreen.tsx
    │       ├── AccountRestrictedScreen.tsx
    │       ├── SignUpScreen.tsx
    │       ├── SignUpCompleteScreen.tsx
    │       ├── AccountRecoveryScreen.tsx
    │       └── index.ts
    │
    ├── navigation/             # 네비게이션
    │   ├── AuthNavigator.tsx
    │   └── index.ts
    │
    ├── styles/                 # 스타일 시스템
    │   ├── colors.ts
    │   ├── typography.ts
    │   ├── spacing.ts
    │   └── index.ts
    │
    ├── utils/                  # 유틸리티
    │   └── validators.ts
    │
    ├── hooks/                  # 커스텀 훅
    │
    └── assets/                 # 정적 파일
        └── images/
```

## 🎨 디자인 시스템

### Colors (색상)
```typescript
primary: '#E53935'      // 메인 레드
secondary: '#212121'    // 다크 그레이
success: '#4CAF50'      // 성공 그린
error: '#E53935'        // 에러 레드
```

### Typography (타이포그래피)
- **h1~h4**: 헤딩
- **body, bodySmall**: 본문
- **label**: 라벨
- **button**: 버튼

### Spacing (간격)
- **xs**: 4px
- **sm**: 8px
- **md**: 12px
- **base**: 16px
- **lg**: 20px
- **xl**: 24px

## 🖼️ 화면 구성

| 코드 | 화면 | 설명 |
|------|------|------|
| UI-MMBR-101 | LoginScreen | 로그인, 소셜 로그인 |
| UI-MMBR-102 | AccountRestrictedScreen | 이용 제한 계정 안내 |
| UI-MMBR-104 | SignUpScreen | 회원가입 (폼 + validation) |
| UI-MMBR-105 | SignUpCompleteScreen | 회원가입 완료 |
| UI-MMBR-106~110 | AccountRecoveryScreen | 아이디 찾기 / 비밀번호 재설정 |

## 🧩 컴포넌트 사용 예시

### Button
```tsx
import { Button } from '@/components/common';

<Button 
  title="로그인" 
  onPress={handleLogin}
  variant="primary"    // primary | secondary | outline | ghost
  size="medium"        // small | medium | large
  loading={isLoading}
  disabled={!isValid}
/>
```

### Input
```tsx
import { Input } from '@/components/common';

<Input
  label="아이디"
  placeholder="아이디를 입력해주세요"
  value={userId}
  onChangeText={setUserId}
  error={errors.userId}
  required
  secureTextEntry={false}
/>
```

### SocialLoginButton
```tsx
import { SocialLoginButton } from '@/components/auth';

<SocialLoginButton
  provider="kakao"     // kakao | naver | google | apple
  onPress={handleKakaoLogin}
  variant="icon"       // icon | full
/>
```

## 🔧 설치 및 실행

```bash
# 의존성 설치
npm install

# iOS 팟 설치
cd ios && pod install && cd ..

# TypeScript 검사
npm run typescript

# 실행
npm run ios     # iOS
npm run android # Android
```

## 📦 주요 의존성

- **react-native**: 0.74.1
- **typescript**: 5.0.4
- **@react-navigation/native**: 6.x
- **@react-navigation/native-stack**: 6.x
- **react-native-safe-area-context**: 4.x
- **react-native-screens**: 3.x

## 🔐 유효성 검사 규칙

### 아이디
- 5~20자
- 영문, 숫자 조합

### 비밀번호
- 8~20자
- 영문 대·소문자, 숫자, 특수문자 권장

### 닉네임
- 5~20자

### 이메일
- 올바른 이메일 형식

## 📝 TODO

- [ ] PASS 본인인증 연동
- [ ] 소셜 로그인 연동 (카카오, 네이버, 구글, 애플)
- [ ] 우편번호 검색 API 연동
- [ ] 약관 상세 모달
- [ ] API 연동
- [ ] 에러 핸들링 개선
- [ ] 테스트 코드 작성
- [ ] 아이콘 라이브러리 연동 (react-native-vector-icons)
