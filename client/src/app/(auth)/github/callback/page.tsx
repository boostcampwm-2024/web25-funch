import AuthGithub from './features/AuthGithub';
import AuthRedirection from '@app/(auth)/features/AuthRedirection';

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

  return <AuthGithub authCode={code} />;
};

export default GithubCallbackPage;
