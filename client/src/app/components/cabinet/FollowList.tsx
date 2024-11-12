import { mockedFollows } from '@mocks/follow';
import { Live } from '@libs/internalTypes';

const FollowList = ({
  isDesktop,
  isExpanded,
  isFolded,
}: {
  isDesktop: boolean;
  isExpanded: boolean;
  isFolded: boolean;
}) => {
  const foldedContent = mockedFollows.slice(0, 5);

  return (
    <div className="pt-2">
      {isExpanded && (
        <>
          {isFolded ? (
            <>
              {mockedFollows.map((follow: Live, key) => (
                <Follow key={follow.id} isDesktop={isDesktop} follow={follow} />
              ))}
            </>
          ) : (
            <>
              {foldedContent.map((follow: Live, key) => (
                <Follow key={follow.id} isDesktop={isDesktop} follow={follow} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

const Follow = ({ follow, isDesktop }: { follow: Live; isDesktop: boolean }) => {
  return (
    <>
      {isDesktop ? (
        <div className="relative">
          <div className="border-neutral-weak funch-desktop:justify-start hover:bg-surface-neutral-strong peer flex w-full items-center rounded-md py-3 pl-2">
            <div className="relative flex flex-1">
              <img
                src={follow.streamer?.profileImage}
                alt={follow.title}
                className="border-border-brand-strong mt-[6px] box-content h-8 w-8 rounded-full"
              />
              <section className="flex w-full pl-[10px]">
                <section className="flex w-2/3 flex-1 flex-col">
                  <div className="text-surface-neutral-inverse funch-bold14">{follow.streamer.name}</div>
                  <div className="funch-bold14">{follow.category}</div>
                </section>
                <em className="text-content-red-base funch-bold16 flex items-center pr-2">{'· ' + follow.viewers}</em>
              </section>
            </div>
          </div>
          <div className="text-content-neutral-primary border-neutral-weak bg-surface-neutral-strong absolute left-52 top-0 z-50 hidden h-20 w-60 items-center rounded-md p-4 peer-hover:flex">
            {follow.title}
          </div>
        </div>
      ) : (
        <div className="relative">
          <div
            className={`border-neutral-weak funch-desktop:justify-start peer relative flex w-full items-center rounded-md py-3 pl-1 ${follow.isStreaming && 'pl-[5px]'}`}
          >
            <img
              src={follow.streamer?.profileImage}
              alt={follow.title}
              className={`border-border-brand-strong box-content h-8 w-8 rounded-full ${follow.isStreaming && 'mx-[-1px] border-2 hover:m-[-2.2px] hover:border-4'}`}
            />
          </div>
          {follow.isStreaming && (
            <div className="bg-surface-neutral-base z-100 absolute left-14 top-3 hidden h-32 w-52 flex-col rounded-md p-3 peer-hover:flex">
              <div className="flex h-1/4 w-full items-center gap-2 truncate">
                <div className="text-content-brand-strong funch-bold16">{follow.streamer.name}</div>
                <div className="funch-bold14 bg-content-static-coolgray rounded-md border-2 p-[3px]">
                  {follow.tags[0]}
                </div>
              </div>
              <div className="funch-medium14 mt-2 flex-1 truncate">{follow.title}</div>
              <div className="text-content-red-base funch-bold16 h-1/4">{'· ' + follow.viewers}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FollowList;
