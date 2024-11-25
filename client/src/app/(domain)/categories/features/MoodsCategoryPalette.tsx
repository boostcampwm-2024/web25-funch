import { MOODS_CATEGORY } from '@libs/constants';
import { MoodsCategoryKey } from '@libs/internalTypes';
import clsx from 'clsx';

type Props = {
  code: MoodsCategoryKey;
};

const MoodsCategoryPalette = ({ code }: Props) => {
  switch (code) {
    case MOODS_CATEGORY.unknown.code:
      return <div className={clsx('h-full w-full', 'from-mood-unknown-start to-mood-unknown-end bg-gradient-to-br')} />;
    case MOODS_CATEGORY.lonely.code:
      return <div className={clsx('h-full w-full', 'from-mood-lonely-start to-mood-lonely-end bg-gradient-to-br')} />;
    case MOODS_CATEGORY.interesting.code:
      return (
        <div
          className={clsx('h-full w-full', 'from-mood-interesting-start to-mood-interesting-end bg-gradient-to-br')}
        />
      );
    case MOODS_CATEGORY.calm.code:
      return <div className={clsx('h-full w-full', 'from-mood-calm-start to-mood-calm-end bg-gradient-to-br')} />;
    case MOODS_CATEGORY.depressed.code:
      return (
        <div className={clsx('h-full w-full', 'from-mood-depressed-start to-mood-depressed-end bg-gradient-to-br')} />
      );
    case MOODS_CATEGORY.happy.code:
      return <div className={clsx('h-full w-full', 'from-mood-happy-start to-mood-happy-end bg-gradient-to-br')} />;
    case MOODS_CATEGORY.getking.code:
      return (
        <div className={clsx('h-full w-full', 'from-mood-get-king-start to-mood-get-king-end bg-gradient-to-br')} />
      );
    case MOODS_CATEGORY.funny.code:
      return <div className={clsx('h-full w-full', 'from-mood-funny-start to-mood-funny-end bg-gradient-to-br')} />;
    case MOODS_CATEGORY.energetic.code:
      return (
        <div className={clsx('h-full w-full', 'from-mood-energetic-start to-mood-energetic-end bg-gradient-to-br')} />
      );
    default:
      return null;
  }
};

export default MoodsCategoryPalette;
