"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';

export default function RootHubPage() {
  const authStatus = useAppStore((state) => state.authStatus);
  const router = useRouter();
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot_password'>('login');
  const [registrationStep, setRegistrationStep] = useState<'request' | 'verify'>('request');
  const [registrationCode, setRegistrationCode] = useState('');
  const [resetStep, setResetStep] = useState<'request' | 'verify'>('request');
  const [resetCode, setResetCode] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const login = useAppStore((state) => state.login);
  const setPlaidLinkToken = useAppStore((state) => state.setPlaidLinkToken);
  const requestPasswordReset = useAppStore((state) => state.requestPasswordReset);
  const resetPassword = useAppStore((state) => state.resetPassword);
  const requestRegistrationCode = useAppStore((state) => state.requestRegistrationCode);
  const verifyRegistration = useAppStore((state) => state.verifyRegistration);

  useEffect(() => {
    if (authStatus === 'authenticated') {
      router.push('/dashboard');
    }
  }, [authStatus, router]);

  const resetToLogin = () => {
    setAuthMode('login');
    setAuthError(null);
    setSuccessMessage(null);
    setResetStep('request');
    setResetCode('');
    setRegistrationStep('request');
    setRegistrationCode('');
  };

  const handleAuthSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError(null);
    setSuccessMessage(null);

    if (authMode === 'forgot_password') {
      if (resetStep === 'request') {
        if (!email) {
          setAuthError('Email is required.');
          return;
        }
        setIsAuthenticating(true);
        try {
          await requestPasswordReset(email.trim());
          setResetStep('verify');
          setSuccessMessage('Verification code sent to your email.');
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to send reset code.';
          setAuthError(message);
        } finally {
          setIsAuthenticating(false);
        }
      } else {
        if (!resetCode || !password) {
          setAuthError('Verification code and new password are required.');
          return;
        }
        setIsAuthenticating(true);
        try {
          await resetPassword(email.trim(), resetCode.trim(), password);
          setAuthMode('login');
          setResetStep('request');
          setResetCode('');
          setPassword('');
          setSuccessMessage('Password reset successfully. Please sign in with your new password.');
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Password reset failed.';
          setAuthError(message);
        } finally {
          setIsAuthenticating(false);
        }
      }
      return;
    }

    setIsAuthenticating(true);

    try {
      if (authMode === 'register') {
        if (registrationStep === 'request') {
          if (!email) {
            setAuthError('Email is required.');
            return;
          }
          await requestRegistrationCode(email.trim());
          setRegistrationStep('verify');
          setSuccessMessage('Verification code sent to your email.');
          return;
        }

        if (!email || !password) {
          setAuthError('Email and password are required.');
          return;
        }

        if (!registrationCode.trim()) {
          setAuthError('Verification code is required.');
          return;
        }

        await verifyRegistration(email.trim(), password, registrationCode.trim());
        setRegistrationStep('request');
        setRegistrationCode('');
      } else {
        if (!email || !password) {
          setAuthError('Email and password are required.');
          return;
        }
        await login(email.trim(), password);
      }

      setPlaidLinkToken(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Authentication failed.';
      setAuthError(message);
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (authStatus === 'loading') {
    return (
      <div className="flex-1 flex justify-center items-center p-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#8B5CF6]/20 mb-4">
            <div className="w-8 h-8 border-2 border-[#8B5CF6] border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (authStatus === 'unauthenticated') {
    return (
      <div className="flex-1 flex justify-center items-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <Card className="border-white/10 bg-gradient-to-br from-[#1A1A24]/80 to-[#0B0B0F]/90 backdrop-blur-xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-4xl tracking-tight">Kura Finance</CardTitle>
              <CardDescription>Manage all your finances in one place</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuthSubmit} className="w-full space-y-4">
                {successMessage && (
                  <Alert variant="success">
                    <AlertDescription>{successMessage}</AlertDescription>
                  </Alert>
                )}

                {authMode !== 'forgot_password' && (
                  <div className="grid grid-cols-2 gap-2 rounded-lg bg-[#0F0F16] p-1">
                    <Button
                      type="button"
                      onClick={resetToLogin}
                      variant={authMode === 'login' ? 'default' : 'ghost'}
                      className={cn('h-9', authMode !== 'login' && 'text-gray-400')}
                    >
                      Sign In
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        setAuthMode('register');
                        setAuthError(null);
                        setSuccessMessage(null);
                        setRegistrationStep('request');
                        setRegistrationCode('');
                      }}
                      variant={authMode === 'register' ? 'default' : 'ghost'}
                      className={cn('h-9', authMode !== 'register' && 'text-gray-400')}
                    >
                      Sign Up
                    </Button>
                  </div>
                )}

                {authMode === 'forgot_password' && (
                  <div className="text-left mb-6">
                    <h2 className="text-lg font-semibold text-white mb-1">Reset Password</h2>
                    <p className="text-xs text-gray-400">
                      {resetStep === 'request'
                        ? 'Enter your email to receive a verification code.'
                        : 'Enter the verification code and your new password.'}
                    </p>
                  </div>
                )}

                <Input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={authMode === 'forgot_password' && resetStep === 'verify'}
                  placeholder="Email"
                />

                {authMode === 'forgot_password' && resetStep === 'verify' && (
                  <>
                    <Input
                      type="text"
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      placeholder="6-digit Verification Code"
                    />
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="New Password"
                    />
                  </>
                )}

                {authMode !== 'forgot_password' && (
                  <Input
                    type="password"
                    name={authMode === 'register' ? 'new-password' : 'current-password'}
                    autoComplete={authMode === 'register' ? 'new-password' : 'current-password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                )}

                {authMode === 'register' && registrationStep === 'verify' && (
                  <Input
                    type="text"
                    value={registrationCode}
                    onChange={(e) => setRegistrationCode(e.target.value)}
                    placeholder="6-digit Verification Code"
                  />
                )}

                {authMode === 'login' && (
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => {
                        setAuthMode('forgot_password');
                        setAuthError(null);
                        setSuccessMessage(null);
                        setResetStep('request');
                      }}
                      variant="ghost"
                      size="sm"
                      className="text-[#A78BFA] hover:text-[#C4B5FD]"
                    >
                      Forgot Password?
                    </Button>
                  </div>
                )}

                {authError && (
                  <Alert variant="destructive">
                    <AlertDescription>{authError}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" disabled={isAuthenticating} className="w-full shadow-[0_0_20px_rgba(139,92,246,0.25)]">
                  {isAuthenticating
                    ? 'Processing...'
                    : authMode === 'forgot_password'
                      ? resetStep === 'request'
                        ? 'Send Code'
                        : 'Reset Password'
                      : authMode === 'register'
                        ? registrationStep === 'request'
                          ? 'Send Verification Code'
                          : 'Create Account'
                        : 'Sign In'}
                </Button>

                {authMode === 'forgot_password' && (
                  <div className="mt-4 text-center">
                    <Button type="button" onClick={resetToLogin} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      Back to Sign In
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
