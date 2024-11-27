'use client';

import { type ChangeEvent, useState } from 'react';
import SearchView from './SearchView';

const Search = () => {
  const [input, setInput] = useState('');
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value);
  const resetInput = () => setInput('');
  const handleSubmit = () => {
    resetInput();
    alert('안녕하세요, FUNCH입니다. ^o^\n검색 기능은 준비 중이에요.');
  };
  return (
    <SearchView onSubmit={handleSubmit}>
      <SearchView.Input value={input} onChange={handleChangeInput} />
      {input.length > 0 && <SearchView.Cancel onClick={resetInput} />}
      <SearchView.Button />
    </SearchView>
  );
};

export default Search;
