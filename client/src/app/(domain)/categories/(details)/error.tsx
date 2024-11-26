'use client';

import Button from '@components/Button';
import useInternalRouter from '@hooks/useInternalRouter';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { push } = useInternalRouter();
  return (
    <section className="min-h-home w-full">
      <h2 className="mb-4 mt-10 text-center">라이브 목록을 불러오는데 실패했어요.</h2>
      <div className="flex justify-center gap-2">
        <Button onClick={() => reset()}>다시 시도하기</Button>
        <Button onClick={() => push('/')}>홈으로</Button>
      </div>
    </section>
  );
}
