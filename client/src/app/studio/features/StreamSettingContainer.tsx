'use client';

import { PropsWithChildren } from 'react';
import { useState, useEffect } from 'react';
import StudioCopyButton from './StudioCopyButton';
import StudioReissueButton from './StudioReIssueButton';
import useUser from '@hooks/useUser';
import { getStreamInfo } from '@libs/actions';

const apiUrl = process.env.NEXT_PUBLIC_MEDIA_SERVER_URL ?? '';

const StreamSettingContainer = () => {
  const { isLoggedin } = useUser();
  const [streamKey, setStreamKey] = useState<string>('');

  const getStreamKey = async () => {
    if (isLoggedin) {
      const streamInfo = await getStreamInfo();
      setStreamKey(streamInfo.stream_key);
    }
  };

  useEffect(() => {
    getStreamKey();
  }, []);

  return (
    <StreamKeyWrapper>
      <div className="mb-2 w-full justify-start">
        <label className="funch-bold20 text-content-neutral-primary ml-2">스트림 설정</label>
      </div>
      <div className="bg-surface-neutral-primary flex h-40 w-full flex-col items-center rounded-lg p-6">
        <StreamURLContainer />
        <StreamKeyContainer streamKey={streamKey} />
      </div>
    </StreamKeyWrapper>
  );
};

const StreamKeyWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-surface-neutral-strong mx-auto flex w-[70%] min-w-[40rem] flex-col items-center rounded-lg p-4 shadow-xl">
      {children}
    </div>
  );
};

const StreamURLContainer = () => {
  return (
    <div className="grid h-1/2 w-full grid-cols-5">
      <div className="funch-bold16 text-content-neutral-primary col-span-1 flex items-center">스트림 URL</div>
      <div className="text-content-neutral-primary col-span-4 flex items-center gap-2">
        {apiUrl}
        <StudioCopyButton text={apiUrl}>복사</StudioCopyButton>
      </div>
    </div>
  );
};

const StreamKeyContainer = ({ streamKey }: { streamKey: string }) => {
  return (
    <div className="grid h-1/2 w-full grid-cols-5">
      <div className="funch-bold16 text-content-neutral-primary col-span-1 flex items-center">스트림 키</div>
      <div className="text-content-neutral-primary col-span-4 flex items-center gap-4">
        {streamKey}
        <div className="flex gap-2">
          <StudioCopyButton text={streamKey}>복사</StudioCopyButton>
          <StudioReissueButton>재발급</StudioReissueButton>
        </div>
      </div>
    </div>
  );
};

export default StreamSettingContainer;
