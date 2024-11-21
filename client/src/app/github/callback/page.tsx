import Auth from './features/Auth';
import AuthRedirection from './features/AuthRedirection';

const GithubCallbackPage = ({
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

export default GithubCallbackPage;
