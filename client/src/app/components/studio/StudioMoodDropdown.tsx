import StudioDropdown from './StudioDropdown';
import { useState, useEffect } from 'react';
import { MoodsCategoryKey } from '@libs/internalTypes';
import { MOODS_CATEGORY } from '@libs/constants';
import MoodsCategoryPalette from '@app/(domain)/categories/features/MoodsCategoryPalette';

type MoodProps = {
  setData: (data: string) => void;
  placeHolder: string;
  data: string;
};

const StudioMoodDropdown = ({ setData, data, placeHolder }: MoodProps) => {
  const moods = Object.values(MOODS_CATEGORY);
  const [selectedKey, setSelectedKey] = useState<string | null>('');
  const [selectedMoodCode, setSelectedMoodCode] = useState<MoodsCategoryKey>('unknown');

  const selectMood = (key: string) => {
    setSelectedKey(key);
    setData(key);
  };

  useEffect(() => {
    console.log(data);
    setSelectedKey(data);
    setSelectedMoodCode(moods.find((m) => m.CODE === data)?.CODE || 'unknown');
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
              {moods
                .filter((m) => m.NAME.includes(inputValue))
                .map((m, idx) => (
                  <StudioDropdown.Item
                    key={idx}
                    onClick={() => {
                      selectMood(m.CODE);
                      blurDropdown();
                      setSelectedMoodCode(m.CODE);
                    }}
                  >
                    <span>{m.NAME}</span>
                  </StudioDropdown.Item>
                ))}
            </StudioDropdown.List>
          )}
          {selectedKey && (
            <div className="relative mt-2 h-10 w-full shadow-md">
              {MoodsCategoryPalette({ code: selectedMoodCode })}
              <div className="text-content-neutral-inverse absolute left-[45%] top-[20%]">
                {moods.find((m) => m.CODE === selectedKey)?.NAME}
              </div>
            </div>
          )}
        </>
      )}
    </StudioDropdown>
  );
};

export default StudioMoodDropdown;
