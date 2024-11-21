import Auth from './features/Auth';
import AuthRedirection from './features/AuthRedirection';

const AuthPage = ({
  searchParams,
}: {
  searchParams?: {
    code: string;
  };
}) => {
  const code = searchParams?.code;

  if (!code) {
    return <AuthRedirection />;
  }

  return <Auth authCode={code} />;
};

export default AuthPage;
