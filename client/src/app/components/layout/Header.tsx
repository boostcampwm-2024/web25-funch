import ToolBar from './ToolBar';
import Search from './Search';

const Header = () => {
  return (
    <header className="h-header min-w-layout fixed left-0 top-0 z-[9999] w-full">
      <Search />
      <ToolBar />
    </header>
  );
};

export default Header;
