// 접었다 펴는 "의견 남기기" 문항 — 랜딩 폼과 결과 페이지가 같이 씁니다.
// type: single(하나), multi(여러 개), scale(1~5), text(서술)
window.SURVEY = [
  {
    id: "intent",
    title: "출시되면 써볼 것 같나요?",
    type: "scale",
    required: true,
    min: "안 쓸 것 같아요",
    max: "바로 써볼래요",
  },
  {
    id: "likes",
    title: "가장 끌리는 건 뭐예요?",
    hint: "최대 2개",
    type: "multi",
    max: 2,
    required: false,
    options: ["옆에서 같이 일하는 수달", "공부 시간만큼 지어지는 집", "집이 모여 커지는 마을", "타이머를 안 눌러도 되는 자동 측정", "공부 기록 달력"],
  },
  {
    id: "next",
    title: "다음에 가장 먼저 생겼으면 하는 건요?",
    type: "single",
    required: false,
    options: ["V2 마을 둘러보기", "V3 기록 남기고 공유", "V4 꾸미기와 상점", "V5 함께 공부", "휴대폰 앱"],
  },
  {
    id: "ads",
    title: "무료 대신 광고가 붙는다면 어디까지 괜찮아요?",
    type: "single",
    required: false,
    options: ["작은 배너 정도", "공부 끝난 뒤 요약 화면에서만", "광고 보면 꾸미기 재화를 받는 방식", "광고가 있으면 안 쓸래요"],
  },
  {
    id: "comment",
    title: "더 하고 싶은 말",
    type: "text",
    required: false,
    placeholder: "이런 수달이면 좋겠다, 이건 아쉽다 등 무엇이든 좋아요",
  },
];
