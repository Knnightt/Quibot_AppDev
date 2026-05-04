import { API_BASE_URL } from './config';
import { authHeaders } from './auth';
import {
  Appointment,
  CreateAppointmentRequest,
  UpdateAppointmentRequest,
  DeleteResponse,
} from '../../types/api.types';

const BASE_URL: string = API_BASE_URL;

// List all appointments (customers see own, admins see all)
export async function getAppointments(token: string | null): Promise<Appointment[]> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/appointments`, {
      method: 'GET',
      headers: authHeaders(token),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to fetch appointments');
    }
  } catch (error) {
    console.log('Get appointments error:', error);
    throw error;
  }
}

// Get specific appointment details
export async function getAppointment(
  token: string | null,
  id: number
): Promise<Appointment> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/appointments/${id}`, {
      method: 'GET',
      headers: authHeaders(token),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to fetch appointment');
    }
  } catch (error) {
    console.log('Get appointment error:', error);
    throw error;
  }
}

// Create new appointment
export async function createAppointment(
  token: string | null,
  appointmentData: CreateAppointmentRequest
): Promise<Appointment> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/appointments`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify(appointmentData),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to create appointment');
    }
  } catch (error) {
    console.log('Create appointment error:', error);
    throw error;
  }
}

// Update appointment
export async function updateAppointment(
  token: string | null,
  id: number,
  appointmentData: UpdateAppointmentRequest
): Promise<Appointment> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/appointments/${id}`, {
      method: 'PUT',
      headers: authHeaders(token),
      body: JSON.stringify(appointmentData),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to update appointment');
    }
  } catch (error) {
    console.log('Update appointment error:', error);
    throw error;
  }
}

// Delete appointment
export async function deleteAppointment(
  token: string | null,
  id: number
): Promise<DeleteResponse> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/appointments/${id}`, {
      method: 'DELETE',
      headers: authHeaders(token),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to delete appointment');
    }
  } catch (error) {
    console.log('Delete appointment error:', error);
    throw error;
  }
}
