'use client';

import SearchContainer from './SearchContainer';

const SearchWrapper = () => {
  return (
    <SearchContainer>
      <SearchContainer.Live />
      <SearchContainer.User />
      <SearchContainer.NoResults />
    </SearchContainer>
  );
};

export default SearchWrapper;
