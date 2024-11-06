'use client';

import Button from '@components/Button';
import useUser from '@hooks/useUser';

const LogoutBtn = () => {
  const { logout } = useUser();
  return <Button onClick={logout}>로그아웃</Button>;
};

export default LogoutBtn;
