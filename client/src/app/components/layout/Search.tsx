'use client';

import { type ChangeEvent, useState } from 'react';
import SearchView from './SearchView';

const Search = () => {
  const [input, setInput] = useState('');
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value);
  const resetInput = () => setInput('');
  const handleSubmit = () => {
    resetInput();
    alert('검색어: ' + input);
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
