'use client';

import DeleteSvg from '@components/svgs/DeleteSvg';
import ReadingGlassSvg from '@components/svgs/ReadingGlassSvg';
import clsx from 'clsx';
import { FormHTMLAttributes, ForwardedRef, forwardRef, type AllHTMLAttributes, type PropsWithChildren } from 'react';

type SearchWrapperProps = FormHTMLAttributes<HTMLFormElement> & PropsWithChildren;

const SearchWrapper = forwardRef(({ children, ...rest }: SearchWrapperProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div
      ref={ref}
      className={clsx(
        'w-search funch-desktop:w-search-wide absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
        'border-border-neutral-base focus-within:border-border-brand-weak rounded-full border border-solid',
      )}
    >
      <form className="w-full" {...rest}>
        <div className={clsx('flex h-9 w-full items-center', 'pl-3.5 pr-2')}>{children}</div>
      </form>
    </div>
  );
});

const SearchInput = (props: AllHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={clsx(
        'funch-medium14 text-content-neutral-primary caret-content-brand-weak placeholder:text-content-neutral-base inline-block w-full bg-transparent outline-none',
      )}
      placeholder="오늘의 FUNCH 검색"
      maxLength={100}
      minLength={1}
      {...props}
    />
  );
};

const SearchCancelButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button type="reset" title="검색어 지우기" aria-label="입력한 검색어 지우기" className="px-2" onClick={onClick}>
      <DeleteSvg />
    </button>
  );
};

const SearchButton = () => {
  return (
    <button
      className={clsx('text-content-neutral-primary h-6 w-6', 'inline-flex items-center justify-center')}
      type="submit"
      aria-label="검색"
      title="검색"
    >
      <ReadingGlassSvg />
    </button>
  );
};

const SearchView = Object.assign(SearchWrapper, {
  Input: SearchInput,
  Button: SearchButton,
  Cancel: SearchCancelButton,
});

export default SearchView;
