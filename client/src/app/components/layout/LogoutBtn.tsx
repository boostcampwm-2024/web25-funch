'use client';

import useUser from '@hooks/useUser';

const LogoutBtn = () => {
  const { logout } = useUser();
  return (
    <div className="border-border-neutral-base text-content-static-white hover:bg-surface-neutral-strong flex items-center rounded-md border px-4 py-1">
      <button className="btn btn-primary" onClick={() => logout()}>
        로그아웃
      </button>
    </div>
  );
};

export default LogoutBtn;
