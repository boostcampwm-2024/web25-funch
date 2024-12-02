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
  const [selectedKey, setSelectedKey] = useState<string | null>('');
  const [selectedCode, setSelectedCode] = useState<ContentsCategoryKey>('talk');

  const selectCategory = (key: string) => {
    setSelectedKey(key);
    setData(key);
  };

  useEffect(() => {
    setSelectedKey(data);
    setSelectedCode(categories.find((c) => c.CODE === data)?.CODE || 'talk');
  }, [data]);

  const categoryName = useMemo(() => {
    return categories.find((c) => c.CODE === data)?.NAME;
  }, [data]);

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
                      selectCategory(c.CODE);
                      blurDropdown();
                      setSelectedCode(c.CODE);
                    }}
                  >
                    <span>{c.NAME}</span>
                  </StudioDropdown.Item>
                ))}
            </StudioDropdown.List>
          )}
          {selectedKey && (
            <div className="mt-5 flex justify-center">
              <div className="flex items-center justify-center">
                <StudioCategoryCard code={selectedCode} title={categoryName as string} />
              </div>
            </div>
          )}
        </>
      )}
    </StudioDropdown>
  );
};

export default StudioCategoryDropdown;
