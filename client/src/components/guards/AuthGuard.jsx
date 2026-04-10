import { Navigate, Outlet } from 'react-router-dom'
import { UserAuthStore } from '../../store/UserAuthStore'

// Blocks logged-in users from accessing login/register pages
export const AuthGuard = () => {
  const user = UserAuthStore((store) => store.user)

  if (user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}