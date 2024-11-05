import ToolBar from './ToolBar';
import Search from './Search';

const Header = () => {
  return (
    <header className="h-header fixed left-0 top-0 w-full">
      <Search />
      <ToolBar />
    </header>
  );
};

export default Header;
