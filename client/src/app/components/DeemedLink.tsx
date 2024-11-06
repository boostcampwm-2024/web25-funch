import clsx from 'clsx';
import Link from 'next/link';
import type { InternalPath } from '@libs/internalTypes';

type DeemedProps = {
  name: string;
  url: InternalPath;
};

const DeemedLink = ({ name, url }: DeemedProps) => {
  return (
    <Link
      href={url}
      className={clsx(
        'funch-bold16 text-content-neutral-strong hover:bg-surface-neutral-base',
        'inline-flex items-center rounded-md p-1',
      )}
    >
      {name}
    </Link>
  );
};

export default DeemedLink;
