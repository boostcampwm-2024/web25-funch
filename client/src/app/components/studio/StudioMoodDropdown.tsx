import StudioDropdown from './StudioDropdown';
// import { useState, useEffect } from 'react';
// import { MoodsCategoryKey } from '@libs/internalTypes';
import { MOODS_CATEGORY } from '@libs/constants';
import MoodsCategoryPalette from '@app/(domain)/categories/features/MoodsCategoryPalette';

type MoodProps = {
  setData: (data: string) => void; // <- 무드 카테고리 키 세터?
  placeHolder: string;
  data: string; // <- 무드 카테고리 키? 코드?
};

const StudioMoodDropdown = ({ setData, data, placeHolder }: MoodProps) => {
  const moods = Object.values(MOODS_CATEGORY);

  const selectedMood = moods.find((m) => m.CODE === data);

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
              {moods
                .filter((m) => m.NAME.includes(inputValue))
                .map((m, idx) => (
                  <StudioDropdown.Item
                    key={idx}
                    onClick={() => {
                      setData(m.CODE);
                      blurDropdown();
                    }}
                  >
                    <span>{m.NAME}</span>
                  </StudioDropdown.Item>
                ))}
            </StudioDropdown.List>
          )}
          {data && (
            <div
              role="region"
              aria-label={`무드 카테도리로 '${selectedMood?.NAME}'이 선택되어 있어요.`}
              className="relative mt-2 h-10 w-full shadow-md"
            >
              {MoodsCategoryPalette({ code: data as any })}
              <div
                aria-hidden
                className="text-content-neutral-inverse absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-default"
              >
                {selectedMood?.NAME}
              </div>
            </div>
          )}
        </>
      )}
    </StudioDropdown>
  );
};

export default StudioMoodDropdown;
