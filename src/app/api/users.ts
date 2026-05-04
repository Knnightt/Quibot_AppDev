import { API_BASE_URL } from './config';
import { authHeaders } from './auth';
import {
  User,
  UserDetails,
  CreateUserRequest,
  UpdateUserRequest,
  DeleteResponse,
} from '../../types/api.types';

const BASE_URL: string = API_BASE_URL;

// List all manager/admin users
export async function getUsers(token: string | null): Promise<User[]> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/users`, {
      method: 'GET',
      headers: authHeaders(token),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to fetch users');
    }
  } catch (error) {
    console.log('Get users error:', error);
    throw error;
  }
}

// Get specific user details
export async function getUser(token: string | null, id: number): Promise<UserDetails> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'GET',
      headers: authHeaders(token),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to fetch user');
    }
  } catch (error) {
    console.log('Get user error:', error);
    throw error;
  }
}

// Create new manager/admin user
export async function createUser(
  token: string | null,
  userData: CreateUserRequest
): Promise<User> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to create user');
    }
  } catch (error) {
    console.log('Create user error:', error);
    throw error;
  }
}

// Update user
export async function updateUser(
  token: string | null,
  id: number,
  userData: UpdateUserRequest
): Promise<User> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: authHeaders(token),
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to update user');
    }
  } catch (error) {
    console.log('Update user error:', error);
    throw error;
  }
}

// Delete user
export async function deleteUser(
  token: string | null,
  id: number
): Promise<DeleteResponse> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: authHeaders(token),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to delete user');
    }
  } catch (error) {
    console.log('Delete user error:', error);
    throw error;
  }
}
