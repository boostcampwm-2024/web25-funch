export const APP_THEME = {
  LIGHT: 'LIGHT' as const,
  DARK: 'DARK' as const,
};

export const LOCAL_STORAGE_THEME_KEY = 'theme';
export const LOCAL_STORAGE_USER_KEY = 'funch-user';

export const COOKIE_USER_KEY = 'funch-user';

export const VIDEO_ICON_COMPONENT_TYPE = {
  DEFAULT: 'DEFAULT' as const,
  FULLSCREEN: 'FULLSCREEN' as const,
  MINI_PLAYER: 'MINI_PLAYER' as const,
};

export const HTTP_METHOD = {
  GET: 'GET' as const,
  POST: 'POST' as const,
  PUT: 'PUT' as const,
  PATCH: 'PATCH' as const,
  DELETE: 'DELETE' as const,
};

export const SOCKET_EVENT = {
  CONNECT: 'connect' as const,
  CHAT: 'chat' as const,
  SET_ANONYMOUS_NAME: 'setAnonymousName' as const,
};

// export const CONTENTS_CATEGORY = {
//   talk: '소통' as const,
//   game: '게임' as const,
//   cook: '요리' as const,
//   outdoor: '야외' as const,
//   dailylife: '일상' as const,
//   virtual: '버추얼' as const,
//   mukbang: '먹방' as const,
//   politics: '정치' as const,
//   music: '음악' as const,
//   economy: '경제' as const,
//   radio: '라디오' as const,
//   develop: '개발' as const,
//   fishing: '낚시' as const,
//   news: '뉴스' as const,
//   study: '공부' as const,
//   beauty: '뷰티' as const,
//   house: '부동산' as const,
//   horror: '호러' as const,
//   travel: '여행' as const,
// };
export const CONTENTS_CATEGORY = {
  talk: {
    code: 'talk',
    name: '소통',
  } as const,
  game: {
    code: 'game',
    name: '게임',
  } as const,
  cook: {
    code: 'cook',
    name: '요리',
  } as const,
  outdoor: {
    code: 'outdoor',
    name: '야외',
  } as const,
  dailylife: {
    code: 'dailylife',
    name: '일상',
  } as const,
  virtual: {
    code: 'virtual',
    name: '버추얼',
  } as const,
  mukbang: {
    code: 'mukbang',
    name: '먹방',
  } as const,
  politics: {
    code: 'politics',
    name: '정치',
  } as const,
  music: {
    code: 'music',
    name: '음악',
  } as const,
  economy: {
    code: 'economy',
    name: '경제',
  } as const,
  radio: {
    code: 'radio',
    name: '라디오',
  } as const,
  develop: {
    code: 'develop',
    name: '개발',
  } as const,
  fishing: {
    code: 'fishing',
    name: '낚시',
  } as const,
  news: {
    code: 'news',
    name: '뉴스',
  } as const,
  study: {
    code: 'study',
    name: '공부',
  } as const,
  beauty: {
    code: 'beauty',
    name: '뷰티',
  } as const,
  house: {
    code: 'house',
    name: '부동산',
  } as const,
  horror: {
    code: 'horror',
    name: '호러',
  } as const,
  travel: {
    code: 'travel',
    name: '여행',
  } as const,
};
