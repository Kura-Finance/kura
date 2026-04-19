"use client";

import React, { ReactNode } from 'react';
import { useAppStore } from '@/store/useAppStore';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const authStatus = useAppStore((state) => state.authStatus);

  // Show loading state while checking authentication
  if (authStatus === 'loading') {
    return (
      fallback || (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#8B5CF6]/20 mb-4">
              <div className="w-8 h-8 border-2 border-[#8B5CF6] border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      )
    );
  }

  // Only render children if authenticated
  if (authStatus === 'authenticated') {
    return <>{children}</>;
  }

  // Unauthenticated - redirect to home page by not rendering children
  return fallback || null;
}
