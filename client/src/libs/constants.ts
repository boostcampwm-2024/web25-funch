export const APP_THEME = {
  LIGHT: 'LIGHT' as const,
  DARK: 'DARK' as const,
};

export const TANSTACK_QUERY_KEY = {
  LIVE_LIST: 'LIVE_LIST' as const,
};

export const LOCAL_STORAGE_THEME_KEY = 'theme';
export const LOCAL_STORAGE_USER_KEY = 'funch-user';
export const LOCAL_STORAGE_PREV_SEARCHES_KEY = 'funch-prev-searches';

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
  CONNECT_ERROR: 'connect_error' as const,
  CONNECT_TIMEOUT: 'connect_timeout' as const,
  DISCONNECT: 'disconnect' as const,
  RECONNECT_FAILED: 'reconnect_failed' as const,
  ERROR: 'error' as const,
};

export const MOODS_CATEGORY = {
  unknown: {
    CODE: 'unknown',
    NAME: '나도 모름',
  } as const,
  lonely: {
    CODE: 'lonely',
    NAME: '쓸쓸한',
  } as const,
  interesting: {
    CODE: 'interesting',
    NAME: '흥미진진한',
  } as const,
  calm: {
    CODE: 'calm',
    NAME: '잔잔한',
  } as const,
  depressed: {
    CODE: 'depressed',
    NAME: '우울한',
  } as const,
  happy: {
    CODE: 'happy',
    NAME: '행복한',
  } as const,
  getking: {
    CODE: 'getking',
    NAME: '킹받는',
  } as const,
  funny: {
    CODE: 'funny',
    NAME: '웃기는',
  } as const,
  energetic: {
    CODE: 'energetic',
    NAME: '활기찬',
  } as const,
};

export const CONTENTS_CATEGORY = {
  talk: {
    CODE: 'talk',
    NAME: '소통',
  } as const,
  game: {
    CODE: 'game',
    NAME: '게임',
  } as const,
  cook: {
    CODE: 'cook',
    NAME: '요리',
  } as const,
  outdoor: {
    CODE: 'outdoor',
    NAME: '야외',
  } as const,
  dailylife: {
    CODE: 'dailylife',
    NAME: '일상',
  } as const,
  virtual: {
    CODE: 'virtual',
    NAME: '버추얼',
  } as const,
  mukbang: {
    CODE: 'mukbang',
    NAME: '먹방',
  } as const,
  politics: {
    CODE: 'politics',
    NAME: '정치',
  } as const,
  music: {
    CODE: 'music',
    NAME: '음악',
  } as const,
  economy: {
    CODE: 'economy',
    NAME: '경제',
  } as const,
  radio: {
    CODE: 'radio',
    NAME: '라디오',
  } as const,
  develop: {
    CODE: 'develop',
    NAME: '개발',
  } as const,
  fishing: {
    CODE: 'fishing',
    NAME: '낚시',
  } as const,
  news: {
    CODE: 'news',
    NAME: '뉴스',
  } as const,
  study: {
    CODE: 'study',
    NAME: '공부',
  } as const,
  beauty: {
    CODE: 'beauty',
    NAME: '뷰티',
  } as const,
  house: {
    CODE: 'house',
    NAME: '부동산',
  } as const,
  horror: {
    CODE: 'horror',
    NAME: '호러',
  } as const,
  travel: {
    CODE: 'travel',
    NAME: '여행',
  } as const,
};

export const STATUS_CODE = {
  UNAUTHORIZED: 401 as const,
};
