import type { InternalPath } from '@libs/internalTypes';
import { useRouter } from 'next/navigation';

const useInternalRouter = () => {
  const router = useRouter();

  return {
    push: (path: InternalPath) => router.push(path),
    replace: (path: InternalPath) => router.replace(path),
    back: () => router.back(),
  };
};

export default useInternalRouter;
