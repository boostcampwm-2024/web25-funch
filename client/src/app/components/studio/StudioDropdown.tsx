'use client';

import ReadingGlassSvg from '@components/svgs/ReadingGlassSvg';
import clsx from 'clsx';
import {
  forwardRef,
  useRef,
  useState,
  useEffect,
  type ForwardedRef,
  type InputHTMLAttributes,
  type PropsWithChildren,
  type RefObject,
  type ReactNode,
  type ChangeEvent,
  type ButtonHTMLAttributes,
} from 'react';

import { CONTENTS_CATEGORY, MOODS_CATEGORY } from '@libs/constants';
import MoodsCategoryPalette from '@app/(domain)/categories/features/MoodsCategoryPalette';
import { MoodsCategoryKey, ContentsCategoryKey } from '@libs/internalTypes';
import StudioCategoryCard from './StudioCategoryCard';

type ChildrenArgs = {
  inputRef: RefObject<HTMLInputElement>;
  inputValue: string;
  isFocused: boolean;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocusInput: () => void;
  blurDropdown: () => void;
};

type Props = {
  children: (args: ChildrenArgs) => ReactNode;
};

const DropdownWrapper = ({ children }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleFocusInput = () => {
    setIsFocused(true);
  };

  const blurDropdown = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={clsx('relative')}>
      {children({
        inputRef,
        inputValue,
        isFocused,
        handleChangeInput,
        handleFocusInput,
        blurDropdown,
      })}
    </div>
  );
};

const DropdownSearch = forwardRef(
  ({ ...rest }: InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div
        className={clsx(
          'inline-flex h-10 w-full items-center gap-1',
          'border-border-neutral-weak focus-within:border-border-brand-base rounded-md border border-solid pl-3.5 pr-1.5',
        )}
      >
        <span className={clsx('text-content-neutral-weak inline-flex h-6 w-6 items-center justify-center')}>
          <ReadingGlassSvg />
        </span>
        <input
          onFocus={() => console.log('focus')}
          ref={ref}
          className={clsx(
            'funch-medium14 text-content-neutral-primary placeholder:text-content-neutral-weak w-full bg-transparent outline-none',
          )}
          type="text"
          {...rest}
        />
      </div>
    );
  },
);

const DropdownList = ({ children }: PropsWithChildren) => {
  return (
    <ul
      className={clsx(
        'shadow-dropdown bg-surface-neutral-primary absolute left-0 top-[3rem] z-[9999] w-full rounded-md py-1.5',
      )}
    >
      {children}
    </ul>
  );
};

type DropdownItemProps = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren;

const DropdownItem = ({ children, ...rest }: DropdownItemProps) => {
  return (
    <li className="h-10 w-full px-1 py-0.5">
      <button className="hover:bg-surface-neutral-weak inline-flex h-full w-full items-center rounded-md" {...rest}>
        {children}
      </button>
    </li>
  );
};

const StudioDropdown = Object.assign(DropdownWrapper, {
  Search: DropdownSearch,
  List: DropdownList,
  Item: DropdownItem,
});

type CategoryTestProps = {
  setData: (data: string) => void;
  componentType: 'category' | 'mood';
};

const categories = Object.values(CONTENTS_CATEGORY);
const moods = Object.values(MOODS_CATEGORY);

export const StudioDropdownRenderer = ({ setData, componentType }: CategoryTestProps) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [selectedCode, setSelectedCode] = useState<ContentsCategoryKey>('talk');
  const [selectedMoodCode, setSelectedMoodCode] = useState<MoodsCategoryKey>('unknown');

  const selectCategory = (key: string) => {
    setSelectedKey(key);
    setData(key);
  };

  useEffect(() => {
    console.log(selectedKey);
  }, [selectedKey]);

  return (
    <StudioDropdown>
      {({ inputRef, inputValue, isFocused, handleChangeInput, handleFocusInput, blurDropdown }) => (
        <>
          <StudioDropdown.Search
            ref={inputRef}
            value={inputValue}
            onChange={handleChangeInput}
            onFocus={handleFocusInput}
            placeholder="플레이스 홀더"
          />
          {isFocused && (
            <StudioDropdown.List>
              {componentType === 'category' ? (
                <>
                  {categories
                    .filter((c) => c.NAME.includes(inputValue))
                    .map((c, idx) => (
                      <StudioDropdown.Item
                        key={idx}
                        onClick={() => {
                          selectCategory(c.NAME);
                          blurDropdown();
                          setSelectedCode(c.CODE);
                        }}
                      >
                        <span>{c.NAME}</span>
                      </StudioDropdown.Item>
                    ))}
                </>
              ) : (
                <>
                  {moods
                    .filter((m) => m.NAME.includes(inputValue))
                    .map((m, idx) => (
                      <StudioDropdown.Item
                        key={idx}
                        onClick={() => {
                          selectCategory(m.NAME);
                          blurDropdown();
                          setSelectedMoodCode(m.CODE);
                        }}
                      >
                        <span>{m.NAME}</span>
                      </StudioDropdown.Item>
                    ))}
                </>
              )}
            </StudioDropdown.List>
          )}
          {selectedKey && (
            <div className="mt-5">
              {componentType === 'category' ? (
                <div className="flex items-center justify-center">
                  <StudioCategoryCard code={selectedCode} title={selectedKey} />
                </div>
              ) : (
                <div className="relative mt-2 h-10 w-full shadow-md">
                  {MoodsCategoryPalette({ code: selectedMoodCode })}
                  <div className="text-content-neutral-inverse absolute left-1/2 top-1/2 -translate-x-9 -translate-y-3">
                    {moods.find((m) => m.NAME === selectedKey)?.NAME}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </StudioDropdown>
  );
};

export default StudioDropdown;
