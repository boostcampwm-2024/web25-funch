'use client';

import { usePathname } from 'next/navigation';
import LiveProvider from '@providers/LiveProvider';
import { type ReactNode, useRef, useState } from 'react';
import NoLiveContent from './NoLiveContent';

const LiveSection = () => {
  const ref = useRef<HTMLVideoElement>(null);
  const pathname = usePathname();

  const play = () => {
    if (ref.current) {
      ref.current.play();
    }
  };

  const fullscreen = () => {
    if (ref.current) {
      ref.current.requestFullscreen();
    }
  };

  const pip = () => {
    if (ref.current) {
      ref.current.requestPictureInPicture();
    }
  };

  if (pathname.split('/')[1] !== 'lives') return null;

  return (
    <LiveProvider>
      <section>
        <LiveController>
          {({ isStreaming }) =>
            isStreaming ? (
              <div className="pl-60" id="test-div">
                <video
                  ref={ref}
                  controls
                  controlsList="nodownload"
                  className="relative"
                  id="test-video"
                  src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
                  width={600}
                >
                  <p className="text-red-5 absolute left-0 top-0">hihih</p>
                </video>
                <PlayButton play={play} />
                <FullscreenButton fullscreen={fullscreen} />
                <PipButton pip={pip} />
              </div>
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

const LiveController = ({ children }: { children: (args: { isStreaming: boolean }) => ReactNode }) => {
  const [isStreaming, setIsStreaming] = useState(true);

  return children({ isStreaming });
};

export default LiveSection;
