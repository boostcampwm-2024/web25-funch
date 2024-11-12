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

  // ** lives 페이지라면 [id]에 해당하는 스트리밍 중인 방송이 있는지 확인하여
  // 없으면 NoLiveContent를 보여주고,(liveId를 null로)
  // 있으면 확장된 Live 섹션을 보여준다.(liveId를 id로)
  // ** lives 페이지가 아니라면,
  // liveId가 존재하는 경우 앱 pip 모드로 전환하여 방송을 계속 보여주고,
  // liveId가 존재하지 않는 경우 아무것도 보여주지 않는다.

  // 1. isLivePage 확인

  // if livePage === true
  // 2.1 [id] 확인
  // 2.2 [id]에 해당하는 방송이 있는지 확인

  // if isStreaming === true
  // 3.1 Live 컴포넌트 렌더링 (확장된 Live 섹션)
  // 3.2 liveId를 [id]로 설정

  // if isStreaming === false
  // 3.1 NoLiveContent 렌더링
  // 3.2 liveId를 null로 설정

  // if livePage === false
  // 2.1 liveId 확인

  // if liveId !== null
  // 3.1 pip 모드로 전환
  // 3.2 방송 계속 보여주기

  // if liveId === null
  // 3.1 아무것도 보여주지 않기

  return (
    <LiveProvider>
      <section>
        <Live>
          {({
            isStreaming,
            videoRef,
            videoWrapperRef,
            toggleMute,
            play,
            pause,
            fullscreen,
            pip,
            volume,
            handleChangeVolume,
          }) => (
            <>
              {isStreaming ? (
                <>
                  <Live.VideoWrapper ref={videoWrapperRef}>
                    <Live.Video ref={videoRef} />
                  </Live.VideoWrapper>
                  <div>
                    <p>hihihi</p>
                    <Live.Play play={play} />
                    <Live.Fullscreen fullscreen={fullscreen} />
                    <Live.Pip pip={pip} />
                    <Live.Pause pause={pause} />
                    <Live.Mute toggleMute={toggleMute} />
                    <Live.Volume volume={volume} handleChangeVolume={handleChangeVolume} />
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
