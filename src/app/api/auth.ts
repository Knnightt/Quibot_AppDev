import { API_BASE_URL } from './config';
import { LoginCredentials, RegisterCredentials, LoginResponse, User } from '../../types';

const BASE_URL: string = API_BASE_URL;

const defaultOptions: RequestInit = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
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
export async function authRegister({ email, password }: RegisterCredentials): Promise<any> {
  try {
    console.log('Attempting registration with:', { email, password });

    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      ...defaultOptions,
      body: JSON.stringify({ email, password }),
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

// Get current user
export async function authMe(token: string | null): Promise<User> {
  try {
    if (!token) {
      throw new Error('No token found');
    }

    console.log('Fetching user with token:', token.substring(0, 20) + '...');

    const response = await fetch(`${BASE_URL}/me`, {
      method: 'GET',
      headers: {
        ...defaultOptions.headers,
        'Authorization': `Bearer ${token}`,
      },
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
          headers: {
            ...defaultOptions.headers,
            'Authorization': `Bearer ${token}`,
          },
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
