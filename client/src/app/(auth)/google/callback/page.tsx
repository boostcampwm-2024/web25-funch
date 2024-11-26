import AuthRedirection from '@app/(auth)/features/AuthRedirection';
import AuthGoogle from '@app/(auth)/google/callback/features/AuthGoogle';

const GoogleCallbackPgae = ({
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

  return <AuthGoogle authCode={code} />;
};

export default GoogleCallbackPgae;
