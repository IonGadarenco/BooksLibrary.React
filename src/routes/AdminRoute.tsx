// src/components/AdminRoute.tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useSyncUser } from '../hooks/useSyncUser' 

export const AdminRoute = () => {
  const { syncedUser } = useSyncUser()
  if (!syncedUser) {
    // nu e logat
    return <Navigate to="/login" replace />
  }
  if ( syncedUser.role !== 'admin') {
    // e logat, dar nu are rolul admin
    return <Navigate to="/access-denied" replace />
  }
  // e admin → lasă child routes să fie randate
  return <Outlet />
}