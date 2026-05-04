import { API_BASE_URL } from './config';
import { authHeaders } from './auth';
import {
  Customer,
  CreateCustomerRequest,
  UpdateCustomerRequest,
  DeleteResponse,
} from '../../types/api.types';

const BASE_URL: string = API_BASE_URL;

// List all customers
export async function getCustomers(token: string | null): Promise<Customer[]> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/customers`, {
      method: 'GET',
      headers: authHeaders(token),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to fetch customers');
    }
  } catch (error) {
    console.log('Get customers error:', error);
    throw error;
  }
}

// Get specific customer details
export async function getCustomer(
  token: string | null,
  id: number
): Promise<Customer> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/customers/${id}`, {
      method: 'GET',
      headers: authHeaders(token),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to fetch customer');
    }
  } catch (error) {
    console.log('Get customer error:', error);
    throw error;
  }
}

// Create new customer
export async function createCustomer(
  token: string | null,
  customerData: CreateCustomerRequest
): Promise<Customer & { message: string }> {
  try {
    const headers: Record<string, string> = token
      ? authHeaders(token)
      : { 'Accept': 'application/json', 'Content-Type': 'application/json' };

    const response = await fetch(`${BASE_URL}/customers`, {
      method: 'POST',
      headers,
      body: JSON.stringify(customerData),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to create customer');
    }
  } catch (error) {
    console.log('Create customer error:', error);
    throw error;
  }
}

// Update customer
export async function updateCustomer(
  token: string | null,
  id: number,
  customerData: UpdateCustomerRequest
): Promise<Customer> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/customers/${id}`, {
      method: 'PUT',
      headers: authHeaders(token),
      body: JSON.stringify(customerData),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to update customer');
    }
  } catch (error) {
    console.log('Update customer error:', error);
    throw error;
  }
}

// Delete customer
export async function deleteCustomer(
  token: string | null,
  id: number
): Promise<DeleteResponse> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/customers/${id}`, {
      method: 'DELETE',
      headers: authHeaders(token),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to delete customer');
    }
  } catch (error) {
    console.log('Delete customer error:', error);
    throw error;
  }
}
