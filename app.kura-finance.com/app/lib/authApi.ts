/**
 * Authentication API Service
 * Web 客户端 - 使用 HttpOnly Cookie
 * 根据认证系统指南实现
 */

import { handleFetchError, handleResponseError, logResponse, logSuccess, extractErrorMessage } from './errorHandler';

export interface BackendUser {
  id: string;
  email: string;
}

export interface BackendUserProfile extends BackendUser {
  displayName: string;
  avatarUrl: string;
  membershipLabel: string;
}

export interface AuthResponse {
  user: BackendUserProfile;
}

interface ApiErrorBody {
  error?: string;
  message?: string;
}

export class AuthApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'AuthApiError';
    this.status = status;
  }
}

export const getBackendBaseUrl = (): string => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error(
      'NEXT_PUBLIC_BACKEND_URL environment variable is not set. ' +
      'Please configure it in your environment or .env.local file.'
    );
  }
  return backendUrl;
};

/**
 * Web 客户端 API 请求
 * 自动包含 X-Client-Type: web 和 credentials: 'include'
 * Token 通过 HttpOnly Cookie 自动发送
 */
async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = getBackendBaseUrl();
  const url = `${baseUrl}${path}`;

  const headers = new Headers(options.headers ?? {});
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }
  // 标识为 Web 客户端
  headers.set('X-Client-Type', 'web');

  try {
    console.log('[AuthAPI] Fetching:', {
      method: options.method || 'GET',
      url,
    });

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // 重要: 包含 HttpOnly Cookie
    });

    logResponse(response.status, response.statusText, response.headers.get('content-type'), url, 'AuthAPI');

    const raw = await response.text();
    let json: (ApiErrorBody & T) | null = null;
    if (raw) {
      try {
        json = JSON.parse(raw) as ApiErrorBody & T;
      } catch {
        json = null;
      }
    }

    if (!response.ok) {
      const { error, message } = extractErrorMessage(json);
      const errorMsg = error || message || `Request failed with status ${response.status}`;
      const { error: apiError } = handleResponseError(response.status, errorMsg, url, 'AuthAPI');
      throw apiError;
    }

    logSuccess(json, url, 'AuthAPI');
    return (json as T) ?? ({} as T);
  } catch (error) {
    // 如果已经是 ApiError，直接抛出
    if (error instanceof AuthApiError) {
      throw error;
    }
    
    const { error: apiError } = handleFetchError(error, url, 'AuthAPI');
    throw apiError;
  }
}

/**
 * 用户注册
 */
export const registerUser = (email: string, password: string): Promise<AuthResponse> => {
  const normalizedEmail = email.toLowerCase().trim();
  return apiRequest<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email: normalizedEmail, password }),
  });
};



/**
 * 用户登出
 * Web 客户端: 清除 HttpOnly Cookie
 */
export const logoutUser = (): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>('/api/auth/logout', {
    method: 'POST',
  });
};

/**
 * 获取当前用户资料
 * Cookie 会自动发送，无需手动传递 token
 */
export const fetchCurrentUserProfile = (): Promise<{ user: BackendUserProfile }> => {
  return apiRequest<{ user: BackendUserProfile }>('/api/auth/me', {
    method: 'GET',
  });
};

/**
 * 更新当前用户资料
 * Cookie 会自动发送，无需手动传递 token
 */
export const updateCurrentUserProfile = (
  payload: { displayName?: string; avatarUrl?: string }
): Promise<{ user: BackendUserProfile }> => {
  return apiRequest<{ user: BackendUserProfile }>(
    '/api/auth/me',
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }
  );
};

/**
 * 改变密码 (SRP)
 */
export const changePassword = (
  srpSalt: string,
  srpVerifier: string,
  encryptedDataKey: string,
  kekSalt: string
): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>(
    '/api/auth/change-password',
    {
      method: 'POST',
      body: JSON.stringify({ srpSalt, srpVerifier, encryptedDataKey, kekSalt }),
    }
  );
};

/**
 * 忘记密码 - 发送重置码
 */
export const requestPasswordReset = (email: string): Promise<{ message: string; expiresIn?: number }> => {
  const normalizedEmail = email.toLowerCase().trim();

  return apiRequest<{ message: string; expiresIn?: number }>('/api/auth/password-reset/send-code', {
    method: 'POST',
    body: JSON.stringify({ email: normalizedEmail }),
  });
};

/**
 * 忘记密码 - 验证重置码并重设 SRP (SRP)
 */
export const resetPassword = (
  email: string,
  resetCode: string,
  srpSalt: string,
  srpVerifier: string,
  encryptedDataKey: string,
  kekSalt: string
): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>('/api/auth/password-reset/verify', {
    method: 'POST',
    body: JSON.stringify({ email, resetCode, srpSalt, srpVerifier, encryptedDataKey, kekSalt }),
  });
};

/**
 * 用户注册 - 第一步：请求注册令牌
 */
export const requestRegisterToken = (email: string): Promise<{ message: string; registerToken?: string }> => {
  const normalizedEmail = email.toLowerCase().trim();
  return apiRequest<{ message: string; registerToken?: string }>('/api/auth/register/request-token', {
    method: 'POST',
    body: JSON.stringify({ email: normalizedEmail }),
  });
};

/**
 * 用户注册 - 第二步：确认注册
 */
export const confirmRegister = (
  email: string,
  password: string,
  registerToken: string
): Promise<AuthResponse> => {
  const normalizedEmail = email.toLowerCase().trim();
  return apiRequest<AuthResponse>('/api/auth/register/confirm', {
    method: 'POST',
    body: JSON.stringify({ email: normalizedEmail, password, registerToken }),
  });
};
