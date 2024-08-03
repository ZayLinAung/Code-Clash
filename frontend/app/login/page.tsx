"use client";
import { useUser } from '@auth0/nextjs-auth0/client'

export default function NavBar() {
  const { user, isLoading } = useUser()

  return (
    <nav>
      {!isLoading && !user && (
        <a href="/api/auth/login" className="login-button">Login</a>
      )}
      {user && (
        <a href="/api/auth/logout" className="logout-button">Logout</a>
      )}
    </nav>
  )
}