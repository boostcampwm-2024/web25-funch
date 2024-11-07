import { mockedFollows } from '@mocks/follow';
import { Live } from '@libs/internalTypes';

const FollowList = ({ isDesktop }: { isDesktop: boolean }) => {
  return (
    <div className="pt-2">
      {mockedFollows.map((follow: Live) => (
        <Follow isDesktop={isDesktop} follow={follow} />
      ))}
    </div>
  );
};

const Follow = ({ follow, isDesktop }: { follow: Live; isDesktop: boolean }) => {
  return (
    <div className="border-neutral-weak funch-desktop:justify-start hover:bg-border-neutral-base group flex w-full items-center rounded-md py-3 pl-2">
      {isDesktop ? (
        <>
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
              <em className="text-content-red-base funch-bold14 flex items-center pr-2">{follow.viewers}</em>
            </section>
          </div>
        </>
      ) : (
        <img
          src={follow.streamer?.profileImage}
          alt={follow.title}
          className="border-border-brand-strong box-content h-8 w-8 rounded-full border-2 hover:m-[-2px] hover:border-4"
        />
      )}
    </div>
  );
};

export default FollowList;
