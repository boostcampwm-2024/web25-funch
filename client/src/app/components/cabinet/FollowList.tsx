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
        <div className="group relative">
          <div className="border-neutral-weak funch-desktop:justify-start hover:bg-border-neutral-base group flex w-full items-center rounded-md py-3 pl-2">
            <div className="relative flex flex-1">
              <img
                src={follow.streamer?.profileImage}
                alt={follow.title}
                className="border-border-brand-strong box-content h-8 w-8 rounded-full"
              />
              <section className="flex w-full pl-3">
                <section className="flex w-2/3 flex-1 flex-col">
                  <div className="text-surface-neutral-inverse funch-bold14">{follow.streamer.name}</div>
                  <div className="funch-bold14">{follow.category}</div>
                </section>
                <em className="text-content-red-base funch-bold16 flex items-center pr-2">{'· ' + follow.viewers}</em>
              </section>
            </div>
            <div className="text-content-neutral-primary border-neutral-weak bg-border-neutral-base absolute left-52 top-0 z-50 flex h-20 w-60 items-center rounded-md p-4 opacity-0 group-hover:opacity-100">
              {follow.title}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`border-neutral-weak funch-desktop:justify-start group relative flex w-full items-center rounded-md py-3 pl-2 ${follow.isStreaming && 'pl-[5px]'}`}
        >
          <img
            src={follow.streamer?.profileImage}
            alt={follow.title}
            className={`border-border-brand-strong box-content h-8 w-8 rounded-full ${follow.isStreaming && 'border-2 hover:m-[-2px] hover:border-4'}`}
          />
          {follow.isStreaming && (
            <div className="bg-surface-neutral-base z-100 absolute left-14 top-3 flex h-32 w-52 flex-col rounded-md p-3 opacity-0 group-hover:opacity-100">
              <div className="flex h-1/4 w-full items-center gap-2 truncate">
                <div className="text-content-brand-strong funch-bold16">{follow.streamer.name}</div>
                <div className="funch-bold14 border-border-neutral-base rounded-md border-2 p-[3px]">
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
