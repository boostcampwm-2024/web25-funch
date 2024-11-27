const AuthLoading = () => {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <p className="funch-bold20 text-content-neutral-primary">인증 중...</p>
      </div>
    </div>
  );
};

export default AuthLoading;
