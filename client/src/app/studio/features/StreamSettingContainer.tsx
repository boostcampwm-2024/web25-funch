import { PropsWithChildren } from 'react';
import { useState } from 'react';
import StudioCopyButton from './StudioCopyButton';

const StreamSettingContainer = () => {
  return (
    <StreamKeyWrapper>
      <div className="mb-2 w-full justify-start">
        <label className="funch-bold20">스트림 설정</label>
      </div>
      <div className="bg-surface-neutral-primary flex h-40 w-full flex-col items-center rounded-lg p-6 shadow-sm">
        <StreamURLContainer />
        <StreamKeyContainer />
      </div>
    </StreamKeyWrapper>
  );
};

const StreamKeyWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-surface-neutral-weak mx-auto flex w-[70%] flex-col items-center rounded-lg p-4">{children}</div>
  );
};

const StreamURLContainer = () => {
  const [streamURL, setStreamURL] = useState('rtmp://live.twitch.tv/app');

  return (
    <div className="grid h-1/2 w-full grid-cols-5">
      <div className="funch-bold16 col-span-1 flex items-center">스트림 URL</div>
      <div className="col-span-4 flex items-center gap-2">
        {streamURL}
        <StudioCopyButton>복사</StudioCopyButton>
      </div>
    </div>
  );
};

const StreamKeyContainer = () => {
  const [streamKey, setStreamKey] = useState('ls1evndcyu2xsia18qzir1l7ot52w3e52t');

  return (
    <div className="grid h-1/2 w-full grid-cols-5">
      <div className="funch-bold16 col-span-1 flex items-center">스트림 키</div>
      <div className="col-span-4 flex items-center gap-2">
        {streamKey}
        <StudioCopyButton>복사</StudioCopyButton>
      </div>
    </div>
  );
};

export default StreamSettingContainer;
