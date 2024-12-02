'use client';

import Button from '@components/Button';
import useUser from '@hooks/useUser';

const LogoutBtn = () => {
  const { logout } = useUser();
  return (
    <Button
      onClick={() => {
        const ok = confirm('로그아웃하시겠어요?');
        if (ok) {
          logout();
        }
      }}
    >
      로그아웃
    </Button>
  );
};

export default LogoutBtn;
