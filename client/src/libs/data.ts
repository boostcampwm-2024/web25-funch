import { CONTENTS_CATEGORY } from '@libs/constants';
import { ContentsCategoryKey } from '@libs/internalTypes';

export const contentsCategories = Object.keys(CONTENTS_CATEGORY).map((categoryKey) => {
  const key = categoryKey as ContentsCategoryKey;
  return {
    key,
    code: CONTENTS_CATEGORY[key].code,
    name: CONTENTS_CATEGORY[key].name,
  };
});
