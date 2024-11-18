import { type PropsWithChildren } from 'react';
import StudioHeader from '@components/studio/StudioHeader';
const layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <StudioHeader />
      {children}
    </>
  );
};

export default layout;
