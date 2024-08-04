'use client';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { SocketProvider } from './context/SocketProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return <UserProvider>
    <SocketProvider>
      {children}
    </SocketProvider>
  </UserProvider>;
}