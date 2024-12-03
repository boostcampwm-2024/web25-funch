'use client';

import StudioCopyButton from './StudioCopyButton';
import StudioReissueButton from './StudioReIssueButton';
import { getStreamInfo } from '@libs/actions';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import ErrorBoundary from '@components/ErrorBoundary';
import { useState } from 'react';
import { refreshStreamKey } from '@libs/actions';
import { TANSTACK_QUERY_KEY } from '@libs/constants';

const apiUrl = process.env.NEXT_PUBLIC_MEDIA_SERVER_URL ?? '';

const StreamSetting = () => {
  return (
    <ErrorBoundary fallback={<p>에러 발생!</p>}>
      <StreamUrl />
      <StreamInfoFetcher />
    </ErrorBoundary>
  );
};

const StreamUrl = () => {
  return (
    <div className="mb-4 grid w-full grid-cols-5">
      <div className="funch-bold16 text-content-neutral-primary col-span-1 flex items-center">스트림 URL</div>
      <div className="text-content-neutral-primary col-span-4 grid grid-cols-6 items-center gap-2">
        <span className="col-span-4 break-all">{apiUrl}</span>
        <div className="col-span-2">
          <StudioCopyButton text={apiUrl}>복사</StudioCopyButton>
        </div>
      </div>
    </div>
  );
};

const StreamInfoFetcher = () => {
  const { data } = useSuspenseQuery({
    queryKey: [TANSTACK_QUERY_KEY.STUDIO_STREAM_INFO],
    queryFn: async () => await getStreamInfo(),
  });
  return <StreamKey streamKey={data.stream_key} />;
};

const StreamKey = ({ streamKey }: { streamKey: string }) => {
  const [myStreamKey, setMyStreamKey] = useState(streamKey);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => await refreshStreamKey(),
    onSuccess: ({ stream_key }) => {
      setMyStreamKey(stream_key);
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEY.STUDIO_STREAM_INFO],
      });
      alert('새로운 스트림 키가 발급되었어요.');
    },
    onError: () => {
      alert('스트림 키 재발급에 실패했어요.');
    },
  });

  return (
    <div className="grid w-full grid-cols-5">
      <div className="funch-bold16 text-content-neutral-primary col-span-1 flex items-center">스트림 키</div>
      <div className="text-content-neutral-primary col-span-4 grid grid-cols-6 items-center gap-2">
        <span className="col-span-4 break-all">{myStreamKey}</span>
        <div className="col-span-2 grid grid-cols-2 gap-2">
          <StudioCopyButton disabled={isPending} text={myStreamKey}>
            복사
          </StudioCopyButton>
          <StudioReissueButton
            disabled={isPending}
            onClick={() => {
              mutate();
            }}
          >
            재발급
          </StudioReissueButton>
        </div>
      </div>
    </div>
  );
};

export default StreamSetting;
