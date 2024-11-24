import StudioCategorySvg from '@components/svgs/StudioCategorySvg';
import StudioPreviewSvg from '@components/svgs/StudioPreviewSvg';
import StudioTitleSvg from '@components/svgs/StudioTitleSvg';

const StudioInfoSettingGuide = () => {
  return (
    <div className="bg-surface-brand-base text-content-neutral-inverse h-[440px] w-[45%] rounded-md p-6 pb-12">
      <label className="funch-bold20"> 방송 정보 설정 가이드</label>
      <div className="flex h-full w-full flex-col">
        <div className="grid h-1/3 grid-cols-5">
          <div className="col-span-1 flex items-center justify-center">
            <StudioPreviewSvg />
          </div>
          <p className="funch-medium14 col-span-4 flex flex-col justify-center">
            <span className="funch-bold16">방송 제목</span>
            매력적인 제목으로 시청자의 관심을 유도해보세요. 시청자가 방송을 찾을 때 사용할 만한 키워드를 넣는 것이
            좋습니다.
          </p>
        </div>
        <div className="grid h-1/3 grid-cols-5">
          <div className="col-span-1 flex items-center justify-center">
            <StudioTitleSvg />
          </div>
          <p className="funch-medium14 col-span-4 flex flex-col justify-center">
            <span className="funch-bold16">카테고리</span>
            시청자가 쉽게 찾을 수 있도록 진행중인 방송 카테고리를 추가하세요. 시청자가 방송을 찾을 때 사용할 만한
            키워드를 넣는 것이 좋습니다.
          </p>
        </div>
        <div className="grid h-1/3 grid-cols-5">
          <div className="col-span-1 flex items-center justify-center">
            <StudioCategorySvg />
          </div>
          <p className="funch-medium14 col-span-4 flex flex-col justify-center">
            <span className="funch-bold16">미리보기 이미지</span>
            진행 중인 방송을 설명할 수 있는 사진을 업로드하세요. 시청자의 관심을 끄는 이미지가 좋습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudioInfoSettingGuide;
