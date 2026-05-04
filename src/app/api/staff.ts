import { API_BASE_URL } from './config';
import { authHeaders } from './auth';
import {
  Staff,
  CreateStaffRequest,
  UpdateStaffRequest,
  DeleteResponse,
} from '../../types/api.types';

const BASE_URL: string = API_BASE_URL;

// List all staff members
export async function getStaff(token: string | null): Promise<Staff[]> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/staff`, {
      method: 'GET',
      headers: authHeaders(token),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to fetch staff');
    }
  } catch (error) {
    console.log('Get staff error:', error);
    throw error;
  }
}

// Get specific staff member details
export async function getStaffMember(
  token: string | null,
  id: number
): Promise<Staff> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/staff/${id}`, {
      method: 'GET',
      headers: authHeaders(token),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to fetch staff member');
    }
  } catch (error) {
    console.log('Get staff member error:', error);
    throw error;
  }
}

// Create new staff member
export async function createStaff(
  token: string | null,
  staffData: CreateStaffRequest
): Promise<Staff> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/staff`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify(staffData),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to create staff');
    }
  } catch (error) {
    console.log('Create staff error:', error);
    throw error;
  }
}

// Update staff member
export async function updateStaff(
  token: string | null,
  id: number,
  staffData: UpdateStaffRequest
): Promise<Staff> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/staff/${id}`, {
      method: 'PUT',
      headers: authHeaders(token),
      body: JSON.stringify(staffData),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to update staff');
    }
  } catch (error) {
    console.log('Update staff error:', error);
    throw error;
  }
}

// Delete staff member
export async function deleteStaff(
  token: string | null,
  id: number
): Promise<DeleteResponse> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/staff/${id}`, {
      method: 'DELETE',
      headers: authHeaders(token),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to delete staff');
    }
  } catch (error) {
    console.log('Delete staff error:', error);
    throw error;
  }
}
