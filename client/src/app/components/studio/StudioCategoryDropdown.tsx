import StudioDropdown from './StudioDropdown';
import { useState, useEffect, useMemo } from 'react';
import { ContentsCategoryKey } from '@libs/internalTypes';
import { CONTENTS_CATEGORY } from '@libs/constants';
import StudioCategoryCard from './StudioCategoryCard';

type CategoryProps = {
  setData: (data: string) => void;
  placeHolder: string;
  data: string;
};

const StudioCategoryDropdown = ({ setData, data, placeHolder }: CategoryProps) => {
  const categories = Object.values(CONTENTS_CATEGORY);

  const selectedCategory = useMemo(() => categories.find((c) => c.CODE === data), [data]);
  const categoryName = selectedCategory?.NAME;

  return (
    <StudioDropdown>
      {({ inputRef, inputValue, isFocused, handleChangeInput, handleFocusInput, blurDropdown }) => (
        <>
          <StudioDropdown.Search
            ref={inputRef}
            value={inputValue}
            onChange={handleChangeInput}
            onFocus={handleFocusInput}
            placeholder={placeHolder}
          />
          {isFocused && (
            <StudioDropdown.List>
              {categories
                .filter((c) => c.NAME.includes(inputValue))
                .map((c, idx) => (
                  <StudioDropdown.Item
                    key={idx}
                    onClick={() => {
                      setData(c.CODE);
                      blurDropdown();
                    }}
                  >
                    <span>{c.NAME}</span>
                  </StudioDropdown.Item>
                ))}
            </StudioDropdown.List>
          )}
          {data && (
            <div className="mt-5 flex justify-center">
              <div className="flex items-center justify-center">
                <StudioCategoryCard code={selectedCategory?.CODE as any} title={categoryName as string} />
              </div>
            </div>
          )}
        </>
      )}
    </StudioDropdown>
  );
};

export default StudioCategoryDropdown;
