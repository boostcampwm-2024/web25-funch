import clsx from 'clsx';
import CabinetContainer from './CabinetContainer';

const Cabinet = () => {
  return (
    <section className="funch-desktop:w-60 fixed left-0 top-0 h-full w-24 overflow-auto pl-4">
      <CabinetContainer />
    </section>
  );
};

export default Cabinet;
