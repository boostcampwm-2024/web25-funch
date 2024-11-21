import RefreshSvg from '@components/svgs/RefreshSvg';
import DownArrowSvg from '@components/svgs/DownArrowSvg';
import UpArrowSvg from '@components/svgs/UpArrowSvg';

const COMPONENT_TYPE = {
  FOLLOW: 'FOLLOW' as const,
  SUGGEST: 'SUGGEST' as const,
};

type BadgeComponentType = keyof typeof COMPONENT_TYPE;

type ExpandedProps = {
  isExpanded: boolean;
  setIsExpanded: (value: React.SetStateAction<boolean>) => void; // 타입도 더 정확하게 수정
  componentType: BadgeComponentType;
};

const DesktopHeader = ({ isExpanded, setIsExpanded, componentType }: ExpandedProps) => {
  return (
    <div className="text-content-neutral-strong flex justify-between">
      <h2 className="funch-bold14 funch-desktop:funch-bold16">
        {componentType === COMPONENT_TYPE.SUGGEST ? '추천 채널' : '팔로우 채널'}
      </h2>
      <div className="flex">
        <RefreshSvg />
        <button onClick={() => setIsExpanded((prev) => !prev)}>{isExpanded ? <UpArrowSvg /> : <DownArrowSvg />}</button>
      </div>
    </div>
  );
};

export default DesktopHeader;
