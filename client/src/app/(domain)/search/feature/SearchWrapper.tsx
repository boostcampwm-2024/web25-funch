'use client';

import SearchContainer from './SearchContainer';

const SearchWrapper = () => {
  return (
    <SearchContainer>
      <SearchContainer.Live />
      <SearchContainer.User />
    </SearchContainer>
  );
};

export default SearchWrapper;
