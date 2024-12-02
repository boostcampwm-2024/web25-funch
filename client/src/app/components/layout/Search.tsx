'use client';

import { type ChangeEvent, useState } from 'react';
import SearchView from './SearchView';
import useInternalRouter from '@hooks/useInternalRouter';
import clsx from 'clsx';

const Search = () => {
  const [isFocused, setIsFocused] = useState(false);
  const { push } = useInternalRouter();
  const [input, setInput] = useState('');
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value);
  const resetInput = () => setInput('');
  const handleSubmit = (searchInput: string) => {
    if (!searchInput) return;
    resetInput();
    push(`/search?query=${searchInput}`);
  };
  return (
    <SearchView
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(input);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSubmit(input);
        }
      }}
    >
      <SearchView.Input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={input}
        onChange={handleChangeInput}
      />
      {input.length > 0 && <SearchView.Cancel onClick={resetInput} />}
      <SearchView.Button />
      {isFocused && (
        <div className={clsx('bg-bg-strong absolute left-0 top-full w-full translate-y-1 rounded-lg px-4 shadow-md')}>
          <NoPrevSearch />
        </div>
      )}
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
