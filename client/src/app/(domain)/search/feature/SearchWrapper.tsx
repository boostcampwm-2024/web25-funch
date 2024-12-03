'use client';

import SearchContainer from './SearchContainer';

const SearchWrapper = () => {
  return (
    <SearchContainer>
      {({ searchLives, isLoading, searchUsers }) => (
        <>
          <SearchContainer.Live searchLives={searchLives} isLoading={isLoading} />
          <SearchContainer.User searchUsers={searchUsers} isLoading={isLoading} />
          <SearchContainer.NoResults searchLives={searchLives} searchUsers={searchUsers} isLoading={isLoading} />
        </>
      )}
    </SearchContainer>
  );
};

export default SearchWrapper;
