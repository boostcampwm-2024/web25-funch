import AuthRedirection from '@app/(auth)/features/AuthRedirection';
import AuthNaver from './features/AuthNaver';

const GithubCallbackPage = ({
  searchParams,
}: {
  searchParams?: {
    code: string;
    state: string;
  };
}) => {
  const code = searchParams?.code;
  const state = searchParams?.state;

  if (!(code && state)) {
    return <AuthRedirection />;
  }

  return <AuthNaver authCode={code} authState={state} />;
};

export default GithubCallbackPage;
