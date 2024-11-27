'use client';
import { PropsWithChildren } from 'react';
import StreamSettingContainer from './features/StreamSettingContainer';
import StudioGuideContainer from './features/StudioGuideContainer';
import StudioInfoSettingGuide from './features/StudioInfoSettingGuide';

const StudioPage = () => {
  return (
    <StudioSettingWrapper>
      <StreamSettingContainer />
      <div className="mt-4 flex justify-center gap-8">
        <StudioGuideContainer />
        <StudioInfoSettingGuide />
      </div>
    </StudioSettingWrapper>
  );
};

type Props = PropsWithChildren<{}>;

const StudioSettingWrapper = ({ children, ...rest }: Props) => {
  return (
    <div className="min-h-home flex w-full flex-col p-10" {...rest}>
      {children}
    </div>
  );
};

export default StudioPage;
