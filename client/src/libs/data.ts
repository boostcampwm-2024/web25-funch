import { CONTENTS_CATEGORY, MOODS_CATEGORY } from '@libs/constants';
import type { ContentsCategoryKey, MoodsCategoryKey } from '@libs/internalTypes';

export const contentsCategories = Object.keys(CONTENTS_CATEGORY).map((categoryKey) => {
  const key = categoryKey as ContentsCategoryKey;
  return {
    code: CONTENTS_CATEGORY[key].code,
    name: CONTENTS_CATEGORY[key].name,
  };
});

export const moodsCategories = Object.keys(MOODS_CATEGORY).map((categoryKey) => {
  const key = categoryKey as MoodsCategoryKey;
  return {
    code: MOODS_CATEGORY[key].code,
    name: MOODS_CATEGORY[key].name,
  };
});
