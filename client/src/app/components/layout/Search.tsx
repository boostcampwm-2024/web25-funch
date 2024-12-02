'use client';

import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import SearchView from './SearchView';
import useInternalRouter from '@hooks/useInternalRouter';
import clsx from 'clsx';
import { LOCAL_STORAGE_PREV_SEARCHES_KEY } from '@libs/constants';
import useClickOutside from '@hooks/useClickOutside';
import Link from 'next/link';

const Search = () => {
  const [prevSearches, setPrevSearches] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const { push } = useInternalRouter();
  const [input, setInput] = useState('');
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.trimStart();
    value = value.replace(/\s+/g, ' ');
    if (value.length > 100) {
      value = value.slice(0, 100);
    }
    setInput(value);
  };
  const resetInput = () => setInput('');
  const resetPrevSearches = () => {
    const prevs = localStorage.getItem(LOCAL_STORAGE_PREV_SEARCHES_KEY);
    if (prevs) {
      setPrevSearches(JSON.parse(prevs));
    }
  };

  const handleSubmit = (searchInput: string, prevs: string[]) => {
    if (!searchInput) return;
    const nextPrevSearches = [searchInput, ...prevs.filter((prev) => prev !== searchInput)];
    localStorage.setItem(LOCAL_STORAGE_PREV_SEARCHES_KEY, JSON.stringify(nextPrevSearches.slice(0, 5)));
    resetInput();
    resetPrevSearches();
    setIsFocused(false);
    (document.activeElement as HTMLElement)?.blur();
    push(`/search?query=${searchInput}`);
  };

  const clearPrevSearches = () => {
    localStorage.removeItem(LOCAL_STORAGE_PREV_SEARCHES_KEY);
    setPrevSearches([]);
    setIsFocused(false);
  };

  useClickOutside(searchWrapperRef, () => {
    setIsFocused(false);
  });

  useEffect(() => {
    resetPrevSearches();
  }, []);

  return (
    <SearchView
      ref={searchWrapperRef}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(input, prevSearches);
      }}
    >
      <SearchView.Input onFocus={() => setIsFocused(true)} value={input} onChange={handleChangeInput} />
      {input.length > 0 && <SearchView.Cancel onClick={resetInput} />}
      <SearchView.Button />
      {isFocused &&
        (prevSearches.length > 0 ? (
          <div className={clsx('bg-bg-strong absolute left-0 top-full w-full translate-y-1 rounded-lg pb-4 shadow-md')}>
            <div className={clsx('text-content-neutral-strong flex items-center justify-between px-4 py-2')}>
              <h5 className="funch-meta12">최근 검색어</h5>
              <button
                className="funch-meta12 underline-offset-2 outline-none hover:underline"
                onClick={clearPrevSearches}
              >
                전체 삭제
              </button>
            </div>
            <ul>
              {prevSearches.map((prev, idx) => (
                <li className="px-2 py-1" key={idx}>
                  <Link
                    className="hover:bg-surface-neutral-weak block w-full overflow-hidden text-ellipsis whitespace-nowrap px-1 py-1.5"
                    href={`/search?query=${prev}`}
                  >
                    {prev}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={clsx('bg-bg-strong absolute left-0 top-full w-full translate-y-1 rounded-lg px-4 shadow-md')}>
            <NoPrevSearch />
          </div>
        ))}
    </SearchView>
  );
};

const NoPrevSearch = () => {
  return (
    <div className="relative h-32">
      <p
        className={clsx(
          'funch-medium14 text-content-neutral-strong absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
        )}
      >
        최근 검색이 없어요.
      </p>
    </div>
  );
};

export default Search;
