import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../../../shared/store/useAppStore';
import Logger from '../../../shared/utils/Logger';

interface ForgotPasswordScreenProps {
  onNavigateToLogin?: () => void;
}

export default function ForgotPasswordScreen({
  onNavigateToLogin,
}: ForgotPasswordScreenProps) {
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestPasswordReset = useAppStore((state) => state.requestPasswordReset);
  const resetPassword = useAppStore((state) => state.resetPassword);

  const handleSendCode = async () => {
    try {
      if (!email.trim()) {
        setError('Email is required');
        return;
      }

      if (!email.includes('@')) {
        setError('Please enter a valid email');
        return;
      }

      setIsLoading(true);
      setError(null);

      Logger.debug('ForgotPasswordScreen', 'Sending password reset code', { email });
      await requestPasswordReset(email);

      Logger.info('ForgotPasswordScreen', 'Password reset code sent');
      setStep('reset');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send code';
      setError(errorMessage);
      Logger.error('ForgotPasswordScreen', 'Send code failed', { error: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      if (!verificationCode.trim()) {
        setError('Verification code is required');
        return;
      }

      if (!newPassword.trim()) {
        setError('New password is required');
        return;
      }

      if (newPassword.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }

      if (!confirmPassword.trim()) {
        setError('Please confirm your password');
        return;
      }

      if (newPassword !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      setIsLoading(true);
      setError(null);

      Logger.debug('ForgotPasswordScreen', 'Resetting password', { email });
      await resetPassword(email, verificationCode.trim(), newPassword);

      Logger.info('ForgotPasswordScreen', 'Password reset successfully');
      Alert.alert('Success', 'Your password has been reset successfully. Please sign in.', [
        {
          text: 'OK',
          onPress: onNavigateToLogin,
        },
      ]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reset password';
      setError(errorMessage);
      Logger.error('ForgotPasswordScreen', 'Reset password failed', { error: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 'reset') {
      setStep('email');
      setVerificationCode('');
      setNewPassword('');
      setConfirmPassword('');
      setError(null);
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0B0F' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: 'space-between' }}>
            {/* ===== TOP SECTION: Title and Form ===== */}
            <View>
              {/* Title: Reset Password */}
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: '700',
                  color: '#FFFFFF',
                  textAlign: 'center',
                  marginTop: 24,
                  marginBottom: 32,
                }}
              >
                Reset Password
              </Text>

              {/* Error Message */}
              {error && (
                <View
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    borderRadius: 8,
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 1,
                    borderColor: 'rgba(239, 68, 68, 0.3)',
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ fontSize: 12, color: '#FCA5A5' }}>{error}</Text>
                </View>
              )}

              {/* Step 1: Email Input */}
              {step === 'email' ? (
                <>
                  {/* Email Input */}
                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 12, color: '#CCCCCC', fontWeight: '600', marginBottom: 8 }}>
                      Email Address
                    </Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 12,
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        backgroundColor: '#1A1A24',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Ionicons name="mail-outline" size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
                      <TextInput
                        placeholder="your@email.com"
                        placeholderTextColor="#666666"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        autoComplete="email"
                        autoCapitalize="none"
                        editable={!isLoading}
                        style={{
                          flex: 1,
                          color: '#FFFFFF',
                          fontSize: 14,
                        }}
                      />
                    </View>
                  </View>

                  {/* Description Text */}
                  <Text
                    style={{
                      fontSize: 11,
                      color: '#999999',
                      textAlign: 'center',
                      lineHeight: 16,
                    }}
                  >
                    Enter your email address and we&apos;ll send you a verification code
                  </Text>
                </>
              ) : (
                <>
                  {/* Email Display (Read-only) */}
                  <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 12, color: '#CCCCCC', fontWeight: '600', marginBottom: 8 }}>
                      Email
                    </Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: 'rgba(34, 197, 94, 0.3)',
                        borderRadius: 12,
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        backgroundColor: 'rgba(34, 197, 94, 0.05)',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Ionicons name="checkmark-circle" size={18} color="#22C55E" style={{ marginRight: 8 }} />
                      <Text style={{ flex: 1, color: '#FFFFFF', fontSize: 14 }}>{email}</Text>
                    </View>
                  </View>

                  {/* Verification Code Input */}
                  <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 12, color: '#CCCCCC', fontWeight: '600', marginBottom: 8 }}>
                      Verification Code
                    </Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 12,
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        backgroundColor: '#1A1A24',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Ionicons name="key-outline" size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
                      <TextInput
                        placeholder="Enter verification code"
                        placeholderTextColor="#666666"
                        value={verificationCode}
                        onChangeText={setVerificationCode}
                        autoCapitalize="none"
                        editable={!isLoading}
                        style={{
                          flex: 1,
                          color: '#FFFFFF',
                          fontSize: 14,
                        }}
                      />
                    </View>
                  </View>

                  {/* New Password Input */}
                  <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 12, color: '#CCCCCC', fontWeight: '600', marginBottom: 8 }}>
                      New Password
                    </Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 12,
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        backgroundColor: '#1A1A24',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Ionicons name="lock-closed-outline" size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
                      <TextInput
                        placeholder="Enter new password"
                        placeholderTextColor="#666666"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        editable={!isLoading}
                        style={{
                          flex: 1,
                          color: '#FFFFFF',
                          fontSize: 14,
                        }}
                      />
                    </View>
                  </View>

                  {/* Confirm Password Input */}
                  <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 12, color: '#CCCCCC', fontWeight: '600', marginBottom: 8 }}>
                      Confirm Password
                    </Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 12,
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        backgroundColor: '#1A1A24',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Ionicons name="lock-closed-outline" size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
                      <TextInput
                        placeholder="Confirm new password"
                        placeholderTextColor="#666666"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        editable={!isLoading}
                        style={{
                          flex: 1,
                          color: '#FFFFFF',
                          fontSize: 14,
                        }}
                      />
                    </View>
                  </View>

                  {/* Description Text */}
                  <Text
                    style={{
                      fontSize: 11,
                      color: '#999999',
                      textAlign: 'center',
                      lineHeight: 16,
                    }}
                  >
                    Enter your verification code and new password to reset your account
                  </Text>
                </>
              )}
            </View>

            {/* ===== MIDDLE: Spacer (flex grows) ===== */}
            <View style={{ flex: 1 }} />

            {/* ===== BOTTOM SECTION: Action Buttons ===== */}
            <View style={{ marginBottom: 24 }}>
              {/* Main Button */}
              <TouchableOpacity
                onPress={step === 'email' ? handleSendCode : handleResetPassword}
                disabled={isLoading}
                style={{
                  paddingVertical: 14,
                  borderRadius: 12,
                  backgroundColor: '#8B5CF6',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 24,
                  opacity: isLoading ? 0.6 : 1,
                }}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>
                    {step === 'email' ? 'Send Verification Code' : 'Reset Password'}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Secondary Button */}
              <TouchableOpacity
                onPress={step === 'email' ? onNavigateToLogin : handleBack}
                disabled={isLoading}
              >
                <Text style={{ fontSize: 13, color: '#8B5CF6', fontWeight: '600', textAlign: 'center' }}>
                  {step === 'email' ? 'Back to Sign In' : 'Edit Email'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
