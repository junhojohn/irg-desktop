::asar를 전역으로 설치
npm install -g asar

::electron packager를 devDependencies로 설치
npm install electron-packager --save-dev

::package.json에 "script의 build와 package" 추가 후
::빌드 실행
npm run build

::asar로 소스코드 안보이게 아카이브 형식으로 패키징(asar사용이유: Windows에서 문제되는 긴 경로 이름에 대한 이슈를 완화시켜줌)
npm run package