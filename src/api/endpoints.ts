const API_BASE = '/api';

export const BOOK_ENDPOINTS = {
  BOOKS_PAGED: `${API_BASE}/books/paged`,
  BOOK_DETAILS: (id: number) => `${API_BASE}/books/${id}`,
  BOOKS: `${API_BASE}/books`,
  EDIT_BOOK: `${API_BASE}/books`,
  EDIT_COVER_IMAGE: `${API_BASE}/books/edit-cover-image`,
  DELETE_BOOK: (id: number) => `${API_BASE}/books/${id}`,
  ADD_BOOK: `${API_BASE}/books`,
  TOGGLE_LIKE: (id: number) => `${API_BASE}/books/${id}/like`,
  LIKED_BOOKS: `${API_BASE}/books/likes`,
  ADD_REVIEW: (id: number) => `${API_BASE}/books/${id}/reviews`,
  RESERVE_BOOK: (id: number) => `${API_BASE}/books/${id}/reserve`,
  CANCEL_RESERVATION: (id: number) => `${API_BASE}/books/${id}/reserve`,
};

export const AUTH_ENDPOINTS = {
    SYNC_USER: `${API_BASE}/Auth/sync`
};
