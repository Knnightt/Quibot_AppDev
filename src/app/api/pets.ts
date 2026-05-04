import { API_BASE_URL } from './config';
import { authHeaders } from './auth';
import {
  Pet,
  CreatePetRequest,
  UpdatePetRequest,
  DeleteResponse,
} from '../../types/api.types';

const BASE_URL: string = API_BASE_URL;

// List all pets (customers see own, admins see all)
export async function getPets(token: string | null): Promise<Pet[]> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/pets`, {
      method: 'GET',
      headers: authHeaders(token),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to fetch pets');
    }
  } catch (error) {
    console.log('Get pets error:', error);
    throw error;
  }
}

// Get specific pet details
export async function getPet(token: string | null, id: number): Promise<Pet> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/pets/${id}`, {
      method: 'GET',
      headers: authHeaders(token),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to fetch pet');
    }
  } catch (error) {
    console.log('Get pet error:', error);
    throw error;
  }
}

// Create new pet
export async function createPet(
  token: string | null,
  petData: CreatePetRequest
): Promise<Pet> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/pets`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify(petData),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to create pet');
    }
  } catch (error) {
    console.log('Create pet error:', error);
    throw error;
  }
}

// Update pet
export async function updatePet(
  token: string | null,
  id: number,
  petData: UpdatePetRequest
): Promise<Pet> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/pets/${id}`, {
      method: 'PUT',
      headers: authHeaders(token),
      body: JSON.stringify(petData),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to update pet');
    }
  } catch (error) {
    console.log('Update pet error:', error);
    throw error;
  }
}

// Delete pet
export async function deletePet(
  token: string | null,
  id: number
): Promise<DeleteResponse> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/pets/${id}`, {
      method: 'DELETE',
      headers: authHeaders(token),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to delete pet');
    }
  } catch (error) {
    console.log('Delete pet error:', error);
    throw error;
  }
}
