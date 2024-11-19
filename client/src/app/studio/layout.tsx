import { type PropsWithChildren } from 'react';
import StudioHeader from '@components/studio/StudioHeader';

const StudioLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <StudioHeader />
      <Main>{children}</Main>
    </>
  );
};

const Main = ({ children }: PropsWithChildren) => {
  return (
    <main className="mx-auto flex justify-center">
      <div className="min-w-layout w-full">{children}</div>
    </main>
  );
};

export default StudioLayout;
