'use client';

import { type PropsWithChildren } from 'react';
import StudioCopyButton from './StudioCopyButton';
import StudioReissueButton from './StudioReIssueButton';
import { getStreamInfo } from '@libs/actions';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import ErrorBoundary from '@components/ErrorBoundary';
import { useState } from 'react';
import { refreshStreamKey } from '@libs/actions';
import { TANSTACK_QUERY_KEY } from '@libs/constants';

const apiUrl = process.env.NEXT_PUBLIC_MEDIA_SERVER_URL ?? '';

const StreamSettingContainer = () => {
  return (
    <StreamKeyWrapper>
      <div className="mb-2 w-full justify-start">
        <label className="funch-bold20 text-content-neutral-primary ml-2">스트림 설정</label>
      </div>
      <div className="bg-surface-neutral-primary flex h-40 w-full flex-col items-center rounded-lg p-6">
        <StreamURLContainer />
        <ErrorBoundary fallback={<p>에러 발생!</p>}>
          <StreamInfoFetcher />
        </ErrorBoundary>
      </div>
    </StreamKeyWrapper>
  );
};

const StreamInfoFetcher = () => {
  const { data } = useSuspenseQuery({
    queryKey: [TANSTACK_QUERY_KEY.STUDIO_STREAM_KEY],
    queryFn: async () => await getStreamInfo(),
  });
  return <StreamKeyContainer streamKey={data.stream_key} />;
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
  const [myStreamKey, setMyStreamKey] = useState(streamKey);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => await refreshStreamKey(),
    onSuccess: ({ stream_key }) => {
      setMyStreamKey(stream_key);
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEY.STUDIO_STREAM_KEY],
      });
      alert('새로운 스트림 키가 발급되었어요.');
    },
    onError: () => {
      alert('스트림 키 재발급에 실패했어요.');
    },
  });

  return (
    <div className="grid h-1/2 w-full grid-cols-5">
      <div className="funch-bold16 text-content-neutral-primary col-span-1 flex items-center">스트림 키</div>
      <div className="text-content-neutral-primary col-span-4 flex items-center gap-4">
        {myStreamKey}
        <div className="flex gap-2">
          <StudioCopyButton text={myStreamKey}>복사</StudioCopyButton>
          <StudioReissueButton onClick={() => mutate()}>재발급</StudioReissueButton>
        </div>
      </div>
    </div>
  );
};

export default StreamSettingContainer;
