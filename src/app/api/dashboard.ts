import { API_BASE_URL } from './config';
import { authHeaders } from './auth';
import { DashboardData, DashboardStat } from '../../types/api.types';

const BASE_URL: string = API_BASE_URL;

// Get dashboard data
export async function getDashboard(token: string | null): Promise<DashboardData> {
  try {
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${BASE_URL}/dashboard`, {
      method: 'GET',
      headers: authHeaders(token),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || data.detail || 'Failed to fetch dashboard');
    }
  } catch (error) {
    console.log('Get dashboard error:', error);
    throw error;
  }
}

// Get dashboard stats only
export async function getDashboardStats(token: string | null): Promise<DashboardStat[]> {
  try {
    const dashboard = await getDashboard(token);
    return dashboard.stats || [];
  } catch (error) {
    console.log('Get dashboard stats error:', error);
    throw error;
  }
}
