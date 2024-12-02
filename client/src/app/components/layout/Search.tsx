'use client';

import { type ChangeEvent, useState } from 'react';
import SearchView from './SearchView';
import useInternalRouter from '@hooks/useInternalRouter';

const Search = () => {
  const { push } = useInternalRouter();
  const [input, setInput] = useState('');
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value);
  const resetInput = () => setInput('');
  const handleSubmit = (searchInput: string) => {
    if (!searchInput) return;
    resetInput();
    // alert('안녕하세요, FUNCH입니다. ^o^\n검색 기능은 준비 중이에요.');
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
      <SearchView.Input value={input} onChange={handleChangeInput} />
      {input.length > 0 && <SearchView.Cancel onClick={resetInput} />}
      <SearchView.Button />
    </SearchView>
  );
};

export default Search;
