'use client';

import Button from '@components/Button';
import NotifySvg from '@components/svgs/NotifySvg';

const NoLiveContent = () => {
  return (
    <div className="">
      <NotifySvg />
      <strong>존재하지 않는 채널입니다.</strong>
      <p>
        지금 입력하신 주소의 페이지는
        <br />
        사라졌거나 다른 페이지로 변경되었습니다.
        <br />
        주소를 다시 확인해주세요.
      </p>
      <Button>다른 방송 보러가기</Button>
    </div>
  );
};

export default NoLiveContent;
