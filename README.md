<div align="center">
    <img src="https://github.com/user-attachments/assets/1037f288-d13a-4f71-8530-a1365efd4eaf" alt="제목">
</div>

<br><br><br><br><br>

# 😝 기분따라 자유롭게 즐기는 FUNCH

### Funch는 취향을 반영해!

✔️ 스트리머는 기분이나 방송의 전반적인 분위기를 `분위기 카테고리`로 표현할 수 있어요. <br>
✔️ 마음에 든 **스트리머를 팔로우**하여 해당 방송을 쉽게 찾아볼 수 있어요. <br>


### 누구나 시청과 채팅을 자유롭게!

✔️ **로그인 하지 않더라도 방송을 시청**하거나 다른 시청자들과 **익명으로 소통**할 수 있어요. <br>
✔️ 익명 유저의 닉네임과 표시 색상을 웹소켓 서버에서 **랜덤하게 생성**하면, 클라이언트에서 채팅 UI로 표현해줘요. <br>

<br>

![최종_1](https://github.com/user-attachments/assets/304d8b08-a2d0-40b0-971d-ad59d169c588)

<br><br><br><br>

# 🌊 빠르고 중단 없는 경험

### 적은 레이턴시

✔️ Object Storage에 API를 통해 업로드하지 않고, mount하여 속도를 `500ms`이상 단축시켰어요. <br>
✔️ **더 적은 레이턴시**를 위해서 다양한 시도를 했어요. 그 결과 최소 
- [🌜 ObjectStorage에 저장할 때 기존 로직(fs.watch)과 Mount 도구를 사용했을 때의 속도 및 성능 비교](https://www.notion.so/ObjectStorage-fs-watch-Mount-141f2d1fd66d80428868c81e60225362?pvs=21)
- [🔩 LLHLS 삽질기](https://www.notion.so/LLHLS-14af2d1fd66d8012a11cc1d6683ac9db?pvs=21)
- [🏸 미디어 서버의 CPU 과부하로 인한 성능 저하](https://www.notion.so/CPU-eadb881d638546eabe87b75b91222c7e?pvs=21)

<img src="https://github.com/user-attachments/assets/dad73daa-5fac-4bd4-9b90-0c34c3c268a1" alt="latency" width="600">

<br><br>

### 방송 시청 중 화면을 전환하더라도 미니 플레이어로 중단 없이 방송을 볼 수 있어요.

✔️ 라이브 섹션을 하나의 페이지가 아니라, **레이아웃에 존재하는 컴포넌트**로 구현했어요. <br>
✔️ 라이브 컨텍스트 프로바이더를 통해 라이브 정보 및 화면 경로 정보 등을 관리하고, 이에 따라 UI를 변경해요. <br>
- [🎊 미니 플레이어 사용 경험 개선 1](https://www.notion.so/1-03891c5ee9ec4b1cbf4a2ead610e4548?pvs=21)
- [⛽️ 미니 플레이어 사용 경험 개선 2](https://www.notion.so/2-8d5c7e775edc4013a742d1f9b045bc66?pvs=21)
- [🌑 라이브 프로바이더 및 라이브 섹션 개선](https://www.notion.so/2ab92075bacc4a44b37c5d534483d4d0?pvs=21)

**🚨 미니 플레이어로 전환되더라도 SSE 및 채팅 웹 소켓 통신이 끊기면 안돼요.** <br>
- 각 컴포넌트가 화면 상에 노출되지는 않되, DOM에는 상존하도록!
- [🌄 라이브 섹션에서 SSE 통신](https://www.notion.so/SSE-399bac29508f4a1496632a0588c597f1?pvs=21)
- [🌟 채팅 1](https://www.notion.so/1-7f68808d2d5245d08fbb7ad9542aac4d?pvs=21)
- [💺 소켓 에러 미쳐버릴 거](https://www.notion.so/14ff2d1fd66d80d4a2afd9aa729120b8?pvs=21)

![최종_2](https://github.com/user-attachments/assets/03254ca6-976a-4c70-a487-9fceb13e73da)

<br><br><br><br>

# 👊🏻 Funch는 언어의 장벽을 뿌셔 !

✔️ 사용자는 자신의 채팅을 한국어, 영어, 일본어, 중국어로 번역할 수 있어요. <br>
✔️ 글로벌 스트리머 & 사용자들과 언어의 장벽 없이 소통할 수 있어요.

![최종_3](https://github.com/user-attachments/assets/312ca85d-95b5-4784-9c74-90b4abb50e55)


<br><br><br><br>

# 🛠️ 불필요한 라이브러리는 NO, 뚝딱뚝딱 가내수공업

✔️ **컨텍스트로 모든 상태를 관리할 수 있겠다고 판단하여 전역 상태 관리 라이브러리는 사용하지 않아요.** <br>
✔️ **미디어 서버를 우리 상황에 맞게 직접 구현했어요.**
- 다양한 프로토콜을 지원하는 미디어 서버가 불필요하여 RTMP 프로토콜만을 지원하는 **미디어 서버를 구현**하고 싶었어요.
- 구현 과정에서 많은 **트러블 슈팅 경험**을 겪었고 이 과정을 모두 **문서화** 했어요.
  - [🪄 RTMP Handshake 구현](https://www.notion.so/RTMP-Handshake-133f2d1fd66d800782dbda1efd0a92cf?pvs=21),[⛄️ RTMP Connect 구현](https://www.notion.so/RTMP-Connect-133f2d1fd66d8044bf8ec649669cd967?pvs=21),[🚦 RTMP createStream, Publish 구현](https://www.notion.so/RTMP-createStream-Publish-001f693dad0e403a827485a07dc0bea3?pvs=21),[🏓 RTMP Packet 파싱 처리 및 생성](https://www.notion.so/RTMP-Packet-134f2d1fd66d80808facfe549620b152?pvs=21)
  - [🎾 RTMP Handshake 이후 연결이 되지 않았던 문제](https://www.notion.so/RTMP-Handshake-12ff2d1fd66d80a49211ebc27c1cd14b?pvs=21), [☃️ RTMP 미디어 데이터 수신 중 Timestamp의 부호가 음수였던 문제](https://www.notion.so/RTMP-Timestamp-12ff2d1fd66d804a90dacb276f8ea96b?pvs=21), [🌚 RTMP Chunk가 잘못 파싱되어 발생한 문제](https://www.notion.so/RTMP-Chunk-e83b537a688040c6890f4db488fcc280?pvs=21)

<br><br><br><br>

# 👷🏻 지속적인 (서비스/코드) 품질 점검

✔️ 개발과 리팩토링의 주기를 반복하며 코드 가독성과 안정성을 높여요. <br>
✔️ 라이트하우스와 GPT에게 주기적으로 서비스 및 코드에 대한 피드백을 요청하고, 이를 반영해요.

<img width="600" alt="refactor" src="https://github.com/user-attachments/assets/d277e082-0e25-458d-a5ea-b312d78d9f37">

<br><br><br><br>

# 🍎 기술 스택

| 분야 | 기술 | 선택 이유 | 
|----------|----------|----------|
| 공통   | <img src="https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1732786637665?alt=media&token=d070c4d4-5a58-4e23-af1d-a7e678d4035b" alt="" width="600"/>   | [TypeScript](https://zzawang.notion.site/TypeScript-01006d67d482438b84df88797fa58e45?pvs=4) <br> [Socket.io](https://zzawang.notion.site/Socket-io-794861dea4544b4093bc030667eaa371?pvs=4)|
| FE   | <img src="https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1732798743094?alt=media&token=d5b7a4d0-af68-4e54-bc3a-ba25d35a1af1)](https://github.com/msdio/stackticon" alt=""  width="600"/> | [Next.js](https://zzawang.notion.site/Next-fffb31410bc74af18d34d1e1b2f17e36?pvs=4) <br> [React](https://zzawang.notion.site/React-e1ed1687898e4c69ae6c2aa63245dc35?pvs=4)<br> [Tanstack-query](https://zzawang.notion.site/Tanstack-query-3613c9add85e4fc2b1537241cad0c533?pvs=4)|
| BE   | <img src="https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1733215718530?alt=media&token=713a1986-9d12-4e4f-b0fa-66ab9fbab496" alt="" width="600"/>  | [Nginx](https://zzawang.notion.site/Nginx-3dcaaea9689e4fde89a135df7c17e3ff?pvs=4) <br> [NestJS](https://zzawang.notion.site/NestJS-c9dbca4b3a19439dba190d2e4dd9df9f?pvs=4) <br> [MySQL](https://zzawang.notion.site/MySQL-e519462950f64859867a5f1c79f82eab?pvs=4) <br> [Redis](https://zzawang.notion.site/Redis-151f2d1fd66d80e28ec2f04e5b53bf1e?pvs=4)|

<br><br>


# 🛠️ 인프라 구성도

<br>

<img width="1200" alt="infra" src="https://github.com/user-attachments/assets/87a52eff-5117-4d8c-a759-a506de88f980">


<br><br><br><br>

## 👩🏻‍💻🧑🏻‍💻 Team 무지개 치즈

<br>

<div align="center">
  
|                               J067_김진영                               |                                J191_이인표                               |                                J266_최호빈                                 |                                 J279_홍정우                                 |
| :------------------------------------------------------------------------: | :------------------------------------------------------------------------: | :------------------------------------------------------------------------: | :-------------------------------------------------------------------------: |
|                                     BE                                     |                                     FE                                     |                                     BE                                     |                                     FE                                      |
| <img src="https://avatars.githubusercontent.com/u/83767872?s=400&u=4c71ae06814eea5e26489d795cdb91f834f0847f&v=4" width=150> | <img src="https://avatars.githubusercontent.com/u/95832210?v=4" width=150> | <img src="https://avatars.githubusercontent.com/u/103445254?v=4" width=150> | <img src="https://avatars.githubusercontent.com/u/79641160?v=4" width=150> |
|                   [@JYKIM317](https://github.com/JYKIM317)                   |                      [@WilleLee](https://github.com/WilleLee)                      |               [@zzawang](https://github.com/zzawang)               |                   [@HongBoogie](https://github.com/HongBoogie)                    |

</div>

