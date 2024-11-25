import { CONTENTS_CATEGORY } from '@libs/constants';
import { ContentsCategoryKey } from '@libs/internalTypes';
import Image from 'next/image';
import talkImage from '@assets/categories/communication.svg';
import gameImage from '@assets/categories/game.svg';
import cookImage from '@assets/categories/cooking.svg';
import outdoorImage from '@assets/categories/outdoor.svg';
import dailylifeImage from '@assets/categories/daily-life.svg';
import virtualImage from '@assets/categories/virtual.svg';
import mukbangImage from '@assets/categories/mukbang.svg';
import politicsImage from '@assets/categories/politics.svg';
import musicImage from '@assets/categories/music.svg';
import economyImage from '@assets/categories/economy.svg';
import radioImage from '@assets/categories/radio.svg';
import developImage from '@assets/categories/development.svg';
import fishingImage from '@assets/categories/fishing.svg';
import newsImage from '@assets/categories/news.svg';
import studyImage from '@assets/categories/education.svg';
import beautyImage from '@assets/categories/beauty.svg';
import houseImage from '@assets/categories/real-estate.svg';
import horrorImage from '@assets/categories/horror.svg';
import travelImage from '@assets/categories/travel.svg';

type Props = {
  code: ContentsCategoryKey;
};

const ContentsCategoryImage = ({ code }: Props) => {
  switch (code) {
    case CONTENTS_CATEGORY.talk.code:
      return <Image fill={true} sizes="100%" src={talkImage} alt={`${CONTENTS_CATEGORY[code]} 카테고리`} />;
    case CONTENTS_CATEGORY.game.code:
      return <Image fill={true} sizes="100%" src={gameImage} alt={`${CONTENTS_CATEGORY[code]} 카테고리`} />;
    case CONTENTS_CATEGORY.cook.code:
      return <Image fill={true} sizes="100%" src={cookImage} alt={`${CONTENTS_CATEGORY[code]} 카테고리`} />;
    case CONTENTS_CATEGORY.outdoor.code:
      return <Image fill={true} sizes="100%" src={outdoorImage} alt={`${CONTENTS_CATEGORY[code]} 카테고리`} />;
    case CONTENTS_CATEGORY.dailylife.code:
      return <Image fill={true} sizes="100%" src={dailylifeImage} alt={`${CONTENTS_CATEGORY[code]} 카테고리`} />;
    case CONTENTS_CATEGORY.virtual.code:
      return <Image fill={true} sizes="100%" src={virtualImage} alt={`${CONTENTS_CATEGORY[code]} 카테고리`} />;
    case CONTENTS_CATEGORY.mukbang.code:
      return <Image fill={true} sizes="100%" src={mukbangImage} alt={`${CONTENTS_CATEGORY[code]} 카테고리`} />;
    case CONTENTS_CATEGORY.politics.code:
      return <Image fill={true} sizes="100%" src={politicsImage} alt={`${CONTENTS_CATEGORY[code]} 카테고리`} />;
    case CONTENTS_CATEGORY.music.code:
      return <Image fill={true} sizes="100%" src={musicImage} alt={`${CONTENTS_CATEGORY[code]} 카테고리`} />;
    case CONTENTS_CATEGORY.economy.code:
      return <Image fill={true} sizes="100%" src={economyImage} alt={`${CONTENTS_CATEGORY[code]} 카테고리`} />;
    case CONTENTS_CATEGORY.radio.code:
      return <Image fill={true} sizes="100%" src={radioImage} alt={`${CONTENTS_CATEGORY[code]} 카테고리`} />;
    case CONTENTS_CATEGORY.develop.code:
      return <Image fill={true} sizes="100%" src={developImage} alt={`${CONTENTS_CATEGORY[code]} 카테고리`} />;
    case CONTENTS_CATEGORY.fishing.code:
      return <Image fill={true} sizes="100%" src={fishingImage} alt={`${CONTENTS_CATEGORY[code]} 카테고리`} />;
    case CONTENTS_CATEGORY.news.code:
      return <Image fill={true} sizes="100%" src={newsImage} alt={`${CONTENTS_CATEGORY[code]} 카테고리`} />;
    case CONTENTS_CATEGORY.study.code:
      return <Image fill={true} sizes="100%" src={studyImage} alt={`${CONTENTS_CATEGORY[code]} 카테고리`} />;
    case CONTENTS_CATEGORY.beauty.code:
      return <Image fill={true} sizes="100%" src={beautyImage} alt={`${CONTENTS_CATEGORY[code]} 카테고리`} />;
    case CONTENTS_CATEGORY.house.code:
      return <Image fill={true} sizes="100%" src={houseImage} alt={`${CONTENTS_CATEGORY[code]} 카테고리`} />;
    case CONTENTS_CATEGORY.horror.code:
      return <Image fill={true} sizes="100%" src={horrorImage} alt={`${CONTENTS_CATEGORY[code]} 카테고리`} />;
    case CONTENTS_CATEGORY.travel.code:
      return <Image fill={true} sizes="100%" src={travelImage} alt={`${CONTENTS_CATEGORY[code]} 카테고리`} />;
    default:
      return null;
  }
};

export default ContentsCategoryImage;
