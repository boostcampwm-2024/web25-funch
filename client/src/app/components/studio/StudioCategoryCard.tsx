import ContentsCategoryImage from '@app/(domain)/categories/features/ContentsCategoryImage';
import { ContentsCategoryKey } from '@libs/internalTypes';

type cardProps = {
  code: ContentsCategoryKey;
  title: string;
};

const StudioCategoryCard = ({ code, title }: cardProps) => {
  return (
    <div className="relative flex h-40 w-40 flex-col items-center justify-center rounded-lg border shadow-lg">
      <div className="absolute top-0 h-32 w-32">
        <ContentsCategoryImage code={code} />
      </div>
      <div className="text-content-static-white bg-surface-violet-base funch-bold14 mt-32 flex h-8 w-full items-center justify-center rounded-b-lg">
        {title}
      </div>
    </div>
  );
};

export default StudioCategoryCard;
