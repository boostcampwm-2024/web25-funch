import CategorySvg from '@components/svgs/CategorySvg';
import Link from 'next/link';

const CategoryLink = () => {
  return (
    <Link
      href="/categories"
      className="funch-desktop:flex hover:bg-border-neutral-weak funch-desktop:pl-[18px] mx-auto mt-4 block h-16 w-4/5 items-center rounded-md"
    >
      <div className="funch-desktop:mx-0 mx-auto flex w-12 justify-center">
        <CategorySvg />
      </div>
      <span className="funch-desktop:mt-0 funch-desktop:h-9 funch-desktop:flex funch-desktop:items-center funch-desktop:funch-bold16 funch-desktop:px-2 funch-medium14 mt-1 block text-center">
        카테고리
      </span>
    </Link>
  );
};

export default CategoryLink;
