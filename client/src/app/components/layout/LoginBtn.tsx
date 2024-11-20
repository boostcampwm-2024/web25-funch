import Button from '@components/Button';
import useInternalRouter from '@hooks/useInternalRouter';

const LoginBtn = () => {
  const { push } = useInternalRouter();
  return <Button onClick={() => push('/login')}>로그인</Button>;
};

export default LoginBtn;
