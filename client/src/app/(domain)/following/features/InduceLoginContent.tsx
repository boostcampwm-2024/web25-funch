import LoginSvg from '@components/svgs/LoginSvg';
import LoginBtn from '@components/layout/LoginBtn';
import Link from 'next/link';

const InduceLoginContent = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <LoginSvg />
      <p>로그인하고 팔로잉 목록을 확인해보세요.</p>
      <div className="flex w-32 items-center justify-center">
        <LoginBtn />
      </div>
    </div>
  );
};

const InduceLoginButton = () => {
  return <div></div>;
};

export default InduceLoginContent;
