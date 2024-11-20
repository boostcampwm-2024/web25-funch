// member.providers.ts
export const MEMBER_REPOSITORY = 'MEMBER_REPOSITORY';
export const DATA_SOURCE = 'DATA_SOURCE';
// live.controller.ts
export const SUGGEST_LIVE_COUNT = 10;
// live.service.ts
export const NOTIFY_LIVE_DATA_INTERVAL_TIME = 30000;
// github.controller.ts
export const GITHUB_LOGIN_ID = (id: string) => `Github@${id}`;
// github.service.ts
export const ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
export const APPLICATION_JSON = 'application/json';
export const RESOURCE_URL = 'https://api.github.com/user';
// member.service.ts
export const DEFAULT_PROFILE_IMAGE = 'https://kr.object.ncloudstorage.com/funch-storage/profile/profile_default.png';
// cookie.service.ts
export const STRICT = 'strict';
// github.controller.ts, auth.controller.ts
export const REFRESH_TOKEN = 'refreshToken';
