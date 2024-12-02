import { MOODS_CATEGORY } from '@libs/constants';
import type { Broadcast, MoodsCategoryKey } from '@libs/internalTypes';
import { getBroadcastsByMoodCategory } from '@mocks/broadcasts';
import { unstable_noStore as noStore } from 'next/cache';
import CategoryLives from '@app/(domain)/categories/(details)/features/CategoryLives';
import { Suspense } from 'react';
import { type Metadata } from 'next';

const fetchData = async (code: string): Promise<Broadcast[]> => {
  if (process.env.NODE_ENV !== 'production') return getBroadcastsByMoodCategory(code);

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const response = await fetch(`${apiUrl}/live/category?mood=${code}`, {
    cache: 'no-cache',
  });

  if (!response.ok) {
    throw new Error('라이브 목록을 불러오는데 실패했어요.');
  }

  const data = await response.json();

  return data;
};

type Props = {
  params: Promise<{
    code: MoodsCategoryKey;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const code = (await params).code;
  const categoryName = MOODS_CATEGORY[code].NAME;

  return {
    title: `${categoryName} 카테고리`,
  };
}

const MoodCategoryPage = async ({ params }: Props) => {
  noStore();

  const code = (await params).code;

  const cateogryName = MOODS_CATEGORY[code].NAME;

  return (
    <section className="min-h-home w-full px-7">
      <div className="mb-4 flex items-center">
        <h2 className="text-content-neutral-primary funch-bold20">{cateogryName}</h2>
      </div>
      <Suspense fallback={<p>라이브 목록을 불러우는 중...</p>}>
        <MoodCategoryFetcher code={code} />
      </Suspense>
    </section>
  );
};

type FetcherProps = {
  code: string;
};

const MoodCategoryFetcher = async ({ code }: FetcherProps) => {
  const lives = await fetchData(code);

  if (lives.length === 0) {
    return <div>아직 방송 중인 스트리머가 없어요. 🥲</div>;
  }

  return <CategoryLives lives={lives} />;
};

export default MoodCategoryPage;
