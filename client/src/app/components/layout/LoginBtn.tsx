import Button from '@components/Button';
import useUser from '@hooks/useUser';

const LoginBtn = () => {
  const { login } = useUser();
  return <Button onClick={login}>로그인</Button>;
};

export default LoginBtn;
