// Action Types
export const GET_DASHBOARD_REQUEST = 'GET_DASHBOARD_REQUEST';
export const GET_DASHBOARD_SUCCESS = 'GET_DASHBOARD_SUCCESS';
export const GET_DASHBOARD_FAILURE = 'GET_DASHBOARD_FAILURE';
export const CLEAR_DASHBOARD_ERROR = 'CLEAR_DASHBOARD_ERROR';

import { DashboardState, Action, DashboardStat } from '../../types';

// Initial State
const initialState: DashboardState = {
  stats: [],
  isLoading: false,
  error: null,
};

// Reducer
export default function dashboardReducer(state = initialState, action: Action): DashboardState {
  switch (action.type) {
    case GET_DASHBOARD_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stats: action.payload as DashboardStat[],
        error: null,
      };

    case GET_DASHBOARD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload as string,
      };

    case CLEAR_DASHBOARD_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}
