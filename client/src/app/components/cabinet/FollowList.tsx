const mockFollowList = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits',
  },
  {
    id: 2,
    name: 'Jane Doe',
    avatar: 'https://randomuser.me/api/portraits',
  },
  {
    id: 3,
    name: 'John Smith',
    avatar: 'https://randomuser.me/api/portraits',
  },
  {
    id: 4,
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits',
  },
  {
    id: 5,
    name: 'John Johnson',
    avatar: 'https://randomuser.me/api/portraits',
  },
];

const FollowList = () => {
  return (
    <>
      {mockFollowList.map((follow) => (
        <Follow key={follow.id} follow={follow} />
      ))}
    </>
  );
};

const Follow = ({ follow }: { follow: { id: number; name: string; avatar: string } }) => {
  return (
    <div className="border-neutral-weak funch-desktop:justify-start flex items-center justify-center py-3">
      <img
        src="https://nng-phinf.pstatic.net/MjAyMzEyMjBfNDkg/MDAxNzAzMDU1NjA1MTY2.bCUbi8bRvnKsF6Gmw_EIPrll1fPYTkJzTDo243vchEEg.JIYN6Ve8RVWFNqjdiwrEImVAAK4s-bNrJRRGA0ikM8sg.JPEG/%EA%B7%B8%EC%9C%BD.jpg?type=f120_120_na"
        alt={follow.name}
        className="border-border-brand-strong box-content h-8 w-8 rounded-full border-2 hover:m-[-2px] hover:border-4"
      />
    </div>
  );
};

export default FollowList;
