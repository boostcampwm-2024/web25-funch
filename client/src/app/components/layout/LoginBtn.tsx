import useUser from '@hooks/useUser';

const LoginBtn = () => {
  const { login } = useUser();
  return (
    <div className="border-border-neutral-base text-content-static-white hover:bg-surface-neutral-strong flex items-center rounded-md border px-4 py-1">
      <button className="btn btn-primary" onClick={() => login()}>
        로그인
      </button>
    </div>
  );
};

export default LoginBtn;
