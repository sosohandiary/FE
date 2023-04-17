# 우리들만의 소소한 다이어리, US!

### US는 친구들과 공유해 다이어리를 꾸밀 수 있는 웹 다이어리 꾸미기 서비스입니다.
---

## 📌 About Project

- Deploy 👉 [[__바로가기__]](https://us-diary.vercel.app/)
- Notion 👉 [[__바로가기__]](https://warp-subway-4cf.notion.site/US-266235af9f03470caa85e5d05073a795)

---

## 📌 주요 기능

- 다이어리(전체 공유) 만들기
- 다이어리(전체 공유) 속지 꾸미기
- 댓글과 좋아요
- 미리 만들어진 다이어리(친구 공유)에 친구 초대하기
- 초대된 친구들이 해당 다이어리에다가 글 적고 댓글과 좋아요도 달아주기
- 알림창에 친구들이 댓글을 달았다는걸 확인해주기

---

<div align=center><h1>📚 STACKS</h1></div>

<div align=center> 
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"> 
<img src="https://img.shields.io/badge/reactQuery-FF4154?style=for-the-badge&logo=reactQuery&logoColor=white">
<img src="https://img.shields.io/badge/reactRouter-CA4245?style=for-the-badge&logo=reactRouter&logoColor=white">
<img src="https://img.shields.io/badge/styledComponents-DB7093?style=for-the-badge&logo=styledComponents&logoColor=white">
</div>

---

## 📌 Trouble Shooting (수정해야함)

| 내용                                            | 해결 방법                                                                                                                                                         |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 이미지 업로드 |  form data와 json 동시에 업로드할 경우, spring과의 협업에서는 json을 Blob을 통해 타입을 지정해주고 append를 하여야 한다.                                                                                                                                 |
| 무한스크롤, useQuery의 refetch, useState 동시 사용 시, 무한 루프에 빠진다                | state 변환 → 리렌더링 → 이때 다시 useQuery 호출                                                                                   |
| 네비바를 특정 라우터에만 보이도록 해야하는데, 각각 라우터 컴퍼넌트 안에서 사용하게 되면 네비바도 리렌더링이 되어 비효율적이고, click 애니메이션이 적용이 안된다.                   | router-dom의 Outlet을 도입 |
| react-draggable 라이브러리를 이용해서 swiper 버튼을 구현하려 하였으나, touch이벤트에서는 movement값이 주어지지 않음         |            start의 위치와 move의 위치값들의 차이를 구해 계산한다                                                 |
| 친구 검색 filter에서 input에 입력하는 값을 백엔드에 전달 할 때 useState를 사용하면 입력된 변경사항이 즉시 반영되지 않음. 또한 useState를 사용했을때 계속해서 리렌더링이 일어남                     | useRef는 업데이트 시 리렌더가 일어나지 않는 가변 값을 저장하는 데 사용 할 수 있음. useRef로 input값을 넘겨줌.                                 |


---

## 📌 개선을 위한 고려사항

- 에러 컨트롤 미흡 : 서버와 정해진 에러 처리는 특정 컴포넌트로 보여주고, 그 외에 비정상 네트워크 에러도 따로 처리 필요
- 깃헙 관리 : 브랜치,커밋,PR,이슈 템플릿을 지키며 관리가 필요
- 유저 정보 저장 : 현재는 로그인 시, Access-Token을 local Storage에 저장중. Refresh-Token으로 보안을 강화해야 하며, 저장이 필요한 다른 사항들(유저 닉네임 등)을 useRef등을 통한 앱 내의 변수로 관리되면 좋겠음.
- 사용 환경 : 현재 크롬브라우저에 최적화 됨. 사용자 경험(UX)을 최적화하기 위해서는 다양한 브라우저 및 디바이스에서도 웹 애플리케이션이 잘 동작할 수 있어야 함. 이를 위해서 크로스 브라우징(cross-browsing)을 고려해야 함.

----

## 📌 팀원 정보 및 개발 블로그 주소

| 이름 | 주특기 | 개발블로그 | 깃허브 |
| --- | --- | --- | --- |
| 황원준 |백엔드| https://velog.io/@potenter11 | https://github.com/1juuun |
| 강혜광 |백엔드| https://khgstart.tistory.com | https://github.com/kingaser |
| 함동진 |백엔드| https://eastjin.tistory.com/ | https://github.com/eastjin |
| 최승호 |프론트엔드| https://a-potato.tistory.com/ | https://github.com/boompeak |
| 곽세령 |프론트엔드| https://kuromi-dev.tistory.com/ | https://github.com/seryoungk |
| 이주애 |프론트엔드| https://www.notion.so/juae-world-8bf6f88c53544eb5a5656e2527749f35 | https://github.com/leejuae1020 |
| 한지윤 |프론트엔드| https://velog.io/@icedlatte | https://github.com/JellyKingdom |
| 김채연 |디자이너|  |
