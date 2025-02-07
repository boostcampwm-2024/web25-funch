import LogoutBtn from '@components/layout/LogoutBtn';
import StudioLogo from './StudioLogo';
import StudioRouter from './StudioRouter';

const StudioHeader = () => {
  return (
    <header className="h-header min-w-layout border-border-neutral-weak bg-bg-base fixed left-0 top-0 z-[9999] w-full border-b">
      <div className="flex h-full items-center justify-between px-8">
        <HeaderLeft />
        <HeaderRight />
      </div>
    </header>
  );
};

// HeaderLeft.tsx
const HeaderLeft = () => {
  return (
    <div className="flex items-center gap-8">
      <StudioLogo />
      <StudioRouter />
    </div>
  );
};

// HeaderRight.tsx
const HeaderRight = () => {
  return (
    <div className="flex items-center gap-2">
      <LogoutBtn />
    </div>
  );
};

export default StudioHeader;
