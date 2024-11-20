'use client';

import useHls from '@hooks/useHls';
import useUser from '@hooks/useUser';
import { getPlaylist } from '@libs/actions';
import type { Broadcast, Playlist } from '@libs/internalTypes';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

const MyStudioVideo = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [playlistUrl, setPlaylistUrl] = useState<Playlist['playlistUrl'] | null>(null);
  const { loggedinUser } = useUser();

  useEffect(() => {
    let isValidEffect = true;
    const fetchLive = async (broadcastId: Broadcast['broadcastId']) => {
      try {
        const fetchedPlaylist = await getPlaylist(broadcastId);
        if (!isValidEffect) return;
        setPlaylistUrl(fetchedPlaylist.playlistUrl);
        setIsLoading(false);
      } catch (err) {
        if (!isValidEffect) return;
        setPlaylistUrl(null);
        setIsError(true);
      }
    };
    const broadcastId = loggedinUser?.broadcastId;

    if (broadcastId) {
      fetchLive(broadcastId);
    }

    return () => {
      isValidEffect = false;
    };
  }, [loggedinUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const shouldShowError = isError || !playlistUrl;

  return (
    <div className={clsx('pt-live-aspect-ratio relative w-full')}>
      <div className={clsx('bg-surface-static-black absolute left-0 top-0 h-full w-full')}>
        {shouldShowError ? (
          <div className="flex h-full items-center justify-center text-white">방송을 불러올 수 없어요.</div>
        ) : (
          <Video playlistUrl={playlistUrl} />
        )}
      </div>
    </div>
  );
};

const Video = ({ playlistUrl }: { playlistUrl: Playlist['playlistUrl'] }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useHls({
    videoRef,
    liveUrl: playlistUrl,
  });

  return (
    <div className="absolute left-0 top-0 h-full w-full">
      <video
        ref={videoRef}
        muted
        className="bg-surface-static-black absolute left-0 top-0 h-full w-full"
        controlsList="nodownload"
        playsInline
      />
    </div>
  );
};

export default MyStudioVideo;
