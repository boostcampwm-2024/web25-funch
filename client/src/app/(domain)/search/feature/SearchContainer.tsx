'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const SearchContainer = () => {
  const params = useSearchParams().get('params');

  const getSearchResults = async () => {};

  useEffect(() => {
    console.log(params);
  }, []);

  return <div></div>;
};

export default SearchContainer;
