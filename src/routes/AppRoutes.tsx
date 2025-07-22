// src/routes/AppRoutes.tsx
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import BookDetailPage from '../pages/BookDetailPage';
import BooksListPage from '../pages/BooksListPage';
import ProfilePage from '../pages/ProfilePage';
import LikedBooksPage from '../pages/LikedBooksPage';
import AccessDeniedPage from '../pages/AccessDeniedPage';
import NotFoundPage from '../pages/NotFoundPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import AddBookPage from '../pages/AddBookPage';
import EditBookPage from '../pages/EditBookPage';
import SettingsPage from '../pages/SettingsPage';
import { AdminRoute } from './AdminRoute';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="books/:id" element={<BookDetailPage />} />
      <Route path="books/paged" element={<BooksListPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="liked" element={<LikedBooksPage />} />
      <Route path="access-denied" element={<AccessDeniedPage />} />

      <Route element={<AdminRoute />}>
        <Route path="admin-dashboard/users" element={<AdminDashboardPage />} />
        <Route path="admin-dashboard/add-book" element={<AddBookPage />} />
        <Route path="admin-dashboard/edit-book/:id" element={<EditBookPage />} />
        <Route path="admin-dashboard/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
