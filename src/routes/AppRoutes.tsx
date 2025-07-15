import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import BookDetailPage from '../pages/BookDetailPage';
import BooksListPage from '../pages/BooksListPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import AccessDeniedPage from '../pages/AccessDeniedPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProfilePage from '../pages/ProfilePage';
import MainLayout from '../layouts/MainLayout';
import AddBookPage from '../pages/AddBookPage';
import SavedBooksPage from '../pages/SavedBooksPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />}></Route>
        <Route path="/books/:id" element={<BookDetailPage />}></Route>
        <Route path="/books/paged" element={<BooksListPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/saved" element={<SavedBooksPage />}></Route>
        <Route path="/admin-dashboard/users" element={<AdminDashboardPage />}></Route>
        <Route path="/admin-dashboard/add-book" element={<AddBookPage />}></Route>
        <Route path="/access-denied" element={<AccessDeniedPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
