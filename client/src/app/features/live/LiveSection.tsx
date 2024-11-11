'use client';

import { useParams, usePathname } from 'next/navigation';
import LiveProvider from '@providers/LiveProvider';
import NoLiveContent from './NoLiveContent';
import Live from './Live';

const LiveSection = () => {
  const pathname = usePathname();

  if (pathname.split('/')[1] !== 'lives') return null;

  const { id } = useParams();
  console.log('id', id); // <- hls id? live streaming id?
  // 이 id 값으로 현재 스트리밍이 유효한지 알려주는 API를 호출해야 할 것 같다.
  // false -> NoLiveContent
  // true -> Live

  return (
    <LiveProvider>
      <section>
        <Live>
          {({ isStreaming, videoRef, videoWrapperRef, play, pause, fullscreen, pip, volume, handleChangeVolue }) => (
            <>
              {isStreaming ? (
                <>
                  <Live.VideoWrapper ref={videoWrapperRef}>
                    <Live.Video ref={videoRef} />
                  </Live.VideoWrapper>
                  <div>
                    <Live.Play play={play} />
                    <Live.Fullscreen fullscreen={fullscreen} />
                    <Live.Pip pip={pip} />
                    <Live.Pause pause={pause} />
                    <Live.Volume volume={volume} handleChangeVolue={handleChangeVolue} />
                  </div>
                </>
              ) : (
                <NoLiveContent />
              )}
            </>
          )}
        </Live>
      </section>
    </LiveProvider>
  );
};

export default LiveSection;
