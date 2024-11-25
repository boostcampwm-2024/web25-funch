import { contentsCategories, moodsCategories } from '@libs/data';
import clsx from 'clsx';
import { type Metadata } from 'next';
import Link from 'next/link';
import ContentsCategoryImage from './features/ContentsCategoryImage';
import MoodsCategoryPalette from './features/MoodsCategoryPalette';

export const metadata: Metadata = {
  title: '카테고리',
};

const CategoriesPage = () => {
  return (
    <div className={clsx('px-7 pt-5')}>
      <h2 className="funch-bold20 text-content-neutral-primary mb-3">콘텐츠 카테고리</h2>
      <div className={clsx('grid grid-cols-5 gap-x-3.5 gap-y-5')}>
        {contentsCategories.map((c) => (
          <div key={c.code}>
            <Link
              href={`/categories/contents/${c.code}`}
              title={`${c.name} 카테고리`}
              aria-label={`${c.name} 카테고리 방송 모아보기`}
            >
              <div className="relative pt-[133.33%]">
                <div className={clsx('absolute left-0 top-0 h-full w-full overflow-hidden rounded-md')}>
                  <ContentsCategoryImage code={c.code} />
                </div>
              </div>
            </Link>
            <p className="funch-bold14 text-content-neutral-primary mt-2.5">{c.name}</p>
          </div>
        ))}
      </div>
      <h2 className="funch-bold20 text-content-neutral-primary mb-3 mt-10">분위기 카테고리</h2>
      <div className={clsx('mb-10 grid grid-cols-5 gap-x-3.5 gap-y-5')}>
        {moodsCategories.map((c) => (
          <div key={c.code}>
            <Link
              href={`/categories/moods/${c.code}`}
              title={`${c.name} 카테고리`}
              aria-label={`${c.name} 카테고리 방송 모아보기`}
            >
              <div className="relative pt-[133.33%]">
                <div className="absolute left-0 top-0 h-full w-full overflow-hidden rounded-md">
                  <MoodsCategoryPalette code={c.code} />
                </div>
              </div>
            </Link>
            <p className="funch-bold14 text-content-neutral-primary mt-2.5">{c.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
