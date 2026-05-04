import { API_BASE_URL } from './config';
import {
  LoginCredentials,
  RegisterCredentials,
  LoginResponse,
  User,
  GoogleOAuthCredentials,
  VerifyEmailCredentials,
  VerifyEmailResponse,
  Customer,
} from '../../types/api.types';

const BASE_URL: string = API_BASE_URL;

const defaultOptions: RequestInit = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};

// Helper function for authenticated requests
const authHeaders = (token: string | null): Record<string, string> => {
  if (!token) {
    throw new Error('No authentication token provided');
  }
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

// Login API call
export async function authLogin({ email, password }: LoginCredentials): Promise<LoginResponse> {
  try {
    console.log('Attempting login with:', { email });

    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      ...defaultOptions,
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log('Login response:', data);

    if (response.ok) {
      if (data.token) {
        return data;
      } else {
        throw new Error('No token received');
      }
    } else {
      throw new Error(data.message || data.detail || 'Login failed');
    }
  } catch (error) {
    console.log('Login error:', error);
    throw error;
  }
}

// Register API call
export async function authRegister({ email, username, password, fullName }: RegisterCredentials): Promise<{ message: string; user: Customer; emailVerificationSent: boolean }> {
  try {
    console.log('Attempting registration with:', { email, username });

    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      ...defaultOptions,
      body: JSON.stringify({ email, username, password, fullName }),
    });

    const data = await response.json();
    console.log('Register response:', data);

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.error || 'Registration failed');
    }
  } catch (error) {
    console.log('Register error:', error);
    throw error;
  }
}

// Google OAuth API call
export async function authGoogleOAuth({ id_token }: GoogleOAuthCredentials): Promise<LoginResponse> {
  try {
    console.log('Attempting Google OAuth login');

    const response = await fetch(`${BASE_URL}/oauth/google/token`, {
      method: 'POST',
      ...defaultOptions,
      body: JSON.stringify({ id_token }),
    });

    const data = await response.json();
    console.log('Google OAuth response:', data);

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Google OAuth failed');
    }
  } catch (error) {
    console.log('Google OAuth error:', error);
    throw error;
  }
}

// Verify Email API call
export async function authVerifyEmail({ token }: VerifyEmailCredentials): Promise<VerifyEmailResponse> {
  try {
    console.log('Verifying email with token');

    const response = await fetch(`${BASE_URL}/verify-email`, {
      method: 'POST',
      ...defaultOptions,
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    console.log('Verify email response:', data);

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Email verification failed');
    }
  } catch (error) {
    console.log('Verify email error:', error);
    throw error;
  }
}

// Get current user
export async function authMe(token: string | null): Promise<User> {
  try {
    if (!token) {
      throw new Error('No token found');
    }

    console.log('Fetching user with token:', token.substring(0, 20) + '...');

    const response = await fetch(`${BASE_URL}/me`, {
      method: 'GET',
      headers: authHeaders(token),
    });

    const data = await response.json();
    console.log('User response:', data);

    if (response.ok) {
      // Handle different response structures
      return data.user || data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to get user');
    }
  } catch (error) {
    console.log('authMe error:', error);
    throw error;
  }
}

// Logout
export async function authLogout(token: string | null): Promise<{ success: boolean }> {
  try {
    if (token) {
      // Call logout API (optional)
      try {
        await fetch(`${BASE_URL}/logout`, {
          method: 'POST',
          headers: authHeaders(token),
        });
      } catch (apiError) {
        console.log('Logout API error (non-critical):', apiError);
      }
    }

    return { success: true };
  } catch (error) {
    console.log('Logout error:', error);
    return { success: true }; // Still return success even if API fails
  }
}

export { authHeaders };
