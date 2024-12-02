import { type PropsWithChildren } from 'react';
import Link from 'next/link';
import OBSSvg from '@components/svgs/ObsSvg';
import PrismSvg from '@components/svgs/PrismSvg';

const StudioGuideContainer = () => {
  return (
    <div className="bg-bg-strong flex h-[30rem] min-w-[23rem] flex-col rounded-lg p-6 shadow-xl">
      <label className="funch-bold20 text-content-neutral-primary">
        <span className="text-content-brand-strong">방송</span> 시작하기
      </label>
      <div className="mt-4 flex flex-col">
        <div className="funch-bold16 text-content-neutral-primary flex items-center gap-2">
          <StudioNumberIcon>1</StudioNumberIcon>
          스트리밍 소프트웨어를 다운로드하세요.
        </div>
        <div className="mt-3 flex w-full items-center justify-center gap-4 text-center">
          <Link
            href="https://obsproject.com/"
            className="funch-medium12 border-border-neutral-weak flex h-[7.2rem] w-[40%] flex-col items-center justify-center rounded-md border p-2 shadow-md hover:opacity-65"
          >
            <OBSSvg />
            <strong className="text-content-neutral-primary mt-3">Open Broadcaster Software</strong>
          </Link>
          <Link
            href="https://prismlive.com/ko_kr/"
            className="funch-medium12 border-border-neutral-weak flex h-[7.2rem] w-[40%] flex-col items-center justify-center rounded-md border p-2 shadow-md hover:opacity-65"
          >
            <div className="h-[55px] w-[55px]">
              <PrismSvg />
            </div>
            <strong className="text-content-neutral-primary mt-3">PRISM Live Studio</strong>
          </Link>
        </div>
        <div className="funch-bold16 text-content-neutral-primary mt-4 flex items-center gap-2">
          <StudioNumberIcon>2</StudioNumberIcon>
          스트림 키를 소프트웨어에 붙여 넣어주세요.
        </div>
        <p className="my-1 ml-7">
          스트림 키는 <span className="text-content-brand-strong">{'방송 관리' + ' > ' + '설정'}</span>
          에서 확인 가능합니다.
        </p>
        <div className="funch-bold16 text-content-neutral-primary mt-4 flex items-center gap-2">
          <StudioNumberIcon>3</StudioNumberIcon>
          스트리밍 소프트웨어에서 방송을 시작하면 라이브 방송이 진행됩니다.
        </div>
        <p className="funch-medium14 my-1 ml-7">방송 시작과 종료를 스트리밍 소프트웨어에서 진행해주세요.</p>
        <div className="funch-desktop:mt-8 mt-4 flex justify-center">
          <StudioBroadCastButton>방송 시작하기</StudioBroadCastButton>
        </div>
      </div>
    </div>
  );
};

const StudioNumberIcon = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-surface-neutral-inverse text-content-neutral-inverse funch-bold14 flex max-h-5 min-h-5 min-w-5 items-center justify-center rounded-full">
      {children}
    </div>
  );
};

const StudioBroadCastButton = ({ children }: PropsWithChildren) => {
  return (
    <button className="bg-surface-brand-strong text-content-static-white funch-bold16 h-[3rem] w-[10rem] rounded-md hover:opacity-90">
      <Link href="/studio/my">{children}</Link>
    </button>
  );
};

export default StudioGuideContainer;
