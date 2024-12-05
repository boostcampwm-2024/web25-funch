import * as dotenv from 'dotenv';
dotenv.config();

const CLOVA_ENDPOINT = 'https://clovastudio.stream.ntruss.com/testapp/v1/chat-completions/HCX-003';

const translationMap = new Map([
  ['korean', '한국어'],
  ['english', '영어'],
  ['japanese', '일본어'],
  ['chinese', '중국어'],
]);

function fetchTranslate(text) {
  const prompt = {
    messages: [
      {
        role: 'system',
        content: '- 주어진 주제를 한국어, 영어, 일본어, 중국어로 생성합니다.\n',
      },
      {
        role: 'user',
        content: text,
      },
    ],
    topP: 0.8,
    topK: 0,
    maxTokens: 512,
    temperature: 0.3,
    repeatPenalty: 3.0,
    stopBefore: [],
    includeAiFilters: true,
    seed: 0,
  };

  return fetch(CLOVA_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
      'X-NCP-CLOVASTUDIO-API-KEY': process.env.X_NCP_CLOVASTUDIO_API_KEY,
      'X-NCP-APIGW-API-KEY': process.env.X_NCP_APIGW_API_KEY,
      'X-NCP-CLOVASTUDIO-REQUEST-ID': process.env.X_NCP_CLOVASTUDIO_REQUEST_ID,
    },
    body: JSON.stringify(prompt),
  });
}

async function translate(text, lang?) {
  if (!lang || lang === 'null') return text;

  const response = await (await fetchTranslate(text)).text();
  const results = response.trim().split('\n\n');

  for (let idx = results.length - 1; idx >= 0; idx--) {
    if (results[idx].match(/event:result/)) {
      const result = results[idx].match(/data:(.+)/);
      const data = JSON.parse(result[1]);
      const content = data.message.content;

      const translates = content.split('\n').reduce((obj, cur) => {
        const [key, value] = cur.split(':');
        if (!Array.from(translationMap.values()).includes(key)) return obj;
        obj[key.trim()] = value.trim();
        return obj;
      }, {});

      return translates[translationMap.get(lang)] ?? text;
    }
  }

  return text;
}

export { translate };
