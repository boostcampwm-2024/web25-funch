import { Suspense } from 'react';
import type { Broadcast, ContentsCategoryKey } from '@libs/internalTypes';
import { getBroadcastsByContentCategory } from '@mocks/broadcasts';
import { CONTENTS_CATEGORY } from '@libs/constants';
import { unstable_noStore as noStore } from 'next/cache';
import CategoryLives from '@app/(domain)/categories/(details)/features/CategoryLives';

const fetchData = async (code: string): Promise<Broadcast[]> => {
  if (process.env.NODE_ENV !== 'production') return getBroadcastsByContentCategory(code);

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const response = await fetch(`${apiUrl}/live/category?content=${code}`, {
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
    code: ContentsCategoryKey;
  }>;
};

const ContentCategoryPage = async ({ params }: Props) => {
  noStore();

  const code = (await params).code;

  const cateogryName = CONTENTS_CATEGORY[code].NAME;

  return (
    <section className="min-h-home w-full px-7">
      <div className="mb-4 flex items-center">
        <h2 className="text-content-neutral-primary funch-bold20">{cateogryName}</h2>
      </div>
      <Suspense fallback={<p>라이브 목록을 불러우는 중...</p>}>
        <ContentCategoryFetcher code={code} />
      </Suspense>
    </section>
  );
};

type FetcherProps = {
  code: string;
};

const ContentCategoryFetcher = async ({ code }: FetcherProps) => {
  const lives = await fetchData(code);

  if (lives.length === 0) {
    return <div>아직 방송 중인 스트리머가 없어요. 🥲</div>;
  }

  return <CategoryLives lives={lives} />;
};

export default ContentCategoryPage;
