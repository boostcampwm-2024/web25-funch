import clsx from 'clsx';
import Link from 'next/link';
import type { InternalPath } from '@libs/internalTypes';

type DeemedProps = {
  name: string;
  url: InternalPath;
};

const DeemedLink = ({ name, url }: DeemedProps) => {
  return (
    <Link href={url} className={clsx('funch-bold24 hover:bg-surface-neutral-weak', 'h-4 w-14 rounded-md px-1')}>
      {name}
    </Link>
  );
};

export default DeemedLink;
