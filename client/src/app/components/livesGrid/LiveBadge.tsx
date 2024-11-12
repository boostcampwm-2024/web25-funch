import LiveSvg from '@components/svgs/LiveSvg';
import { comma } from '@libs/formats';

const LiveBadge = ({ viewers }: { viewers: number }) => {
  return (
    <div aria-hidden className="absolute left-1.5 top-1 flex h-5 gap-1">
      <span className="bg-surface-red-strong inline-flex h-full items-center rounded-md px-1">
        <LiveSvg />
      </span>
      <span className="funch-bold12 text-content-static-white inline-flex h-full items-center rounded-md bg-[rgba(20,21,23,.9)] px-1">
        {comma(viewers)}명
      </span>
    </div>
  );
};

export default LiveBadge;
