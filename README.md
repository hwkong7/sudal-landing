# 수달공방 랜딩 + 출시 알림 신청

- `index.html` 랜딩 페이지 (히어로/하단 출시 알림 신청 폼, 접었다 펴는 의견 남기기)
- `questions.js` 의견 남기기 문항 (여기만 고치면 폼과 결과 페이지에 같이 반영)
- `api/survey.js` 신청(`signups/`)과 의견(`responses/`)을 Vercel Blob(private)에 JSON으로 저장
- `api/results.js` + `results.html` 팀 전용 현황 페이지 `/results` (`RESULTS_KEY` 환경변수로 보호)
- 유입 경로 추적: 링크 뒤에 `?ref=insta` 처럼 붙이면 신청에 같이 저장돼요

## 환경변수
- `BLOB_READ_WRITE_TOKEN` (Blob 스토어 연결 시 자동)
- `RESULTS_KEY` 현황 페이지 열람 키
