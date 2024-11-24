'use client';
import { PropsWithChildren } from 'react';
import StreamSettingContainer from './features/StreamsettingContainer';
import StudioGuideContainer from './features/StudioGuideContainer';
import StudioInfoSettingGuide from './features/StudioInfoSettingGuide';

const StudioPage = () => {
  return (
    <StudioSettingWrapper>
      <StreamSettingContainer />
      <div className="flex">
        <StudioGuideContainer />
        <StudioInfoSettingGuide />
      </div>
    </StudioSettingWrapper>
  );
};

type Props = PropsWithChildren<{}>;

const StudioSettingWrapper = ({ children, ...rest }: Props) => {
  return (
    <div className="h-live-section flex w-full flex-col p-10" {...rest}>
      {children}
    </div>
  );
};

export default StudioPage;
