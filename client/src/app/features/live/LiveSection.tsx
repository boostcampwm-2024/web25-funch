'use client';

import { usePathname } from 'next/navigation';
import LiveProvider from '@providers/LiveProvider';
import { type ChangeEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import NoLiveContent from './NoLiveContent';

const LiveSection = () => {
  const ref = useRef<HTMLVideoElement>(null);
  const pathname = usePathname();
  const [volume, setVolume] = useState(50);

  const play = () => {
    if (ref.current && ref.current.paused) {
      ref.current.play();
    }
  };

  const fullscreen = () => {
    // if (ref.current) {
    //   ref.current.requestFullscreen();
    // }
    const div = document.getElementById('test-div');
    if (div) {
      div.requestFullscreen();
    }
  };

  const pip = () => {
    if (ref.current) {
      ref.current.requestPictureInPicture();
    }
  };

  const pause = () => {
    if (ref.current && !ref.current.paused) {
      ref.current.pause();
    }
  };

  const handleChangeVolue = (e: ChangeEvent<HTMLInputElement>) => {
    const nextVolume = Number(e.target.value);
    setVolume(nextVolume);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume / 100;
    }
  }, [volume]);

  if (pathname.split('/')[1] !== 'lives') return null;

  return (
    <LiveProvider>
      <section>
        <LiveController>
          {({ isStreaming }) =>
            isStreaming ? (
              <>
                <div className="w-full" id="test-div">
                  <div className="pb-live-aspect-ratio relative w-full">
                    <div className="absolute left-0 top-0 h-full w-full">
                      <video
                        ref={ref}
                        controlsList="nodownload"
                        id="test-video"
                        src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
                        width="100%"
                        height="100%"
                        playsInline
                        webkit-playsinline
                        x-webkit-airplay
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <PlayButton play={play} />
                  <FullscreenButton fullscreen={fullscreen} />
                  <PipButton pip={pip} />
                  <PauseButton pause={pause} />
                  <VolumeController volume={volume} handleChangeVolue={handleChangeVolue} />
                </div>
              </>
            ) : (
              <NoLiveContent />
            )
          }
        </LiveController>
      </section>
    </LiveProvider>
  );
};

const PlayButton = ({ play }: { play: () => void }) => {
  return <button onClick={play}>재생</button>;
};

const FullscreenButton = ({ fullscreen }: { fullscreen: () => void }) => {
  return <button onClick={fullscreen}>풀스크린</button>;
};

const PipButton = ({ pip }: { pip: () => void }) => {
  return <button onClick={pip}>PIP</button>;
};

const PauseButton = ({ pause }: { pause: () => void }) => {
  return <button onClick={pause}>일시정지</button>;
};

const VolumeController = ({
  volume,
  handleChangeVolue,
}: {
  volume: number;
  handleChangeVolue: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return <input type="range" min="0" max="100" value={volume} onChange={handleChangeVolue} />;
};

const LiveController = ({ children }: { children: (args: { isStreaming: boolean }) => ReactNode }) => {
  const [isStreaming, setIsStreaming] = useState(true);

  return children({ isStreaming });
};

export default LiveSection;
