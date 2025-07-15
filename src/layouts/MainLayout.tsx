import { Outlet } from 'react-router-dom';
import BooksToolBar from './BooksToolBar';
import ContentForPages from './ContentForPages';

const MainLayout = () => {
  return (
    <>
      <BooksToolBar />
      <ContentForPages>
        <Outlet />
      </ContentForPages>
    </>
  );
};

export default MainLayout;
