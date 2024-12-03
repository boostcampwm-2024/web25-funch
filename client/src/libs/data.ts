import { CONTENTS_CATEGORY, MOODS_CATEGORY } from '@libs/constants';
import type { ContentsCategoryKey, MoodsCategoryKey, TranslationCode } from '@libs/internalTypes';

export const contentsCategories = Object.keys(CONTENTS_CATEGORY).map((categoryKey) => {
  const key = categoryKey as ContentsCategoryKey;
  return {
    code: CONTENTS_CATEGORY[key].CODE,
    name: CONTENTS_CATEGORY[key].NAME,
  };
});

export const moodsCategories = Object.keys(MOODS_CATEGORY).map((categoryKey) => {
  const key = categoryKey as MoodsCategoryKey;
  return {
    code: MOODS_CATEGORY[key].CODE,
    name: MOODS_CATEGORY[key].NAME,
  };
});

export const translationList: { code: TranslationCode; name: string }[] = [
  { code: null, name: '선택 안 함' },
  { code: 'korean', name: '한국어' },
  {
    code: 'english',
    name: '영어',
  },
  { code: 'japanese', name: '일본어' },
  { code: 'chinese', name: '중국어' },
];
