# 수달공방 랜딩 + 설문

- `index.html` 랜딩 페이지와 설문 폼 (문항은 `questions.js`에서 수정)
- `api/survey.js` 응답을 Vercel Blob(private)에 JSON으로 저장
- `api/results.js` + `results.html` 팀 전용 결과 집계 페이지 (`RESULTS_KEY` 환경변수로 보호)
- 유입 경로 추적: 링크 뒤에 `?ref=insta` 처럼 붙이면 응답에 같이 저장돼요

## 환경변수
- `BLOB_READ_WRITE_TOKEN` (Blob 스토어 연결 시 자동)
- `RESULTS_KEY` 결과 페이지 열람 키
