import CabinetLink from './CabinetLink';
import CategoryLink from './CategoryLink';
import FollowLink from './FollowLink';

const CabinetContainer = () => {
  return (
    <div className="flex h-full flex-col pt-16">
      <CategoryNavigator />
      <StreamerNavigator />
    </div>
  );
};

const CategoryNavigator = () => {
  return (
    <div className="funch-desktop:h-44 h-48 overflow-hidden">
      <CabinetLink link="category" />
      <CabinetLink link="follow" />
    </div>
  );
};

const StreamerNavigator = () => {
  return (
    <div className="funch-desktop:w-3/4 border-t-bg-strong mx-auto h-full w-1/2 overflow-y-auto border-t">
      <h2></h2>
    </div>
  );
};

export default CabinetContainer;
