import Sidebar from './Sidebar';
import Header from './Header';
import FollowBar from './FollowBar';

const Layout = ({ children }) => {
  return (
    <div className="text-black dark:text-white bg-white dark:bg-black w-screen h-screen overflow-y-auto overflow-x-hidden scrollbar-hide transition-colors">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-4 h-full">
          <Sidebar />
          <div className="h-full col-span-3 lg:col-span-2 border-x-[1px] border-color overflow-y-auto">
            <Header />
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
