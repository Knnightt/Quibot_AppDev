// Action Types
export const GET_STAFF_REQUEST = 'GET_STAFF_REQUEST';
export const GET_STAFF_SUCCESS = 'GET_STAFF_SUCCESS';
export const GET_STAFF_FAILURE = 'GET_STAFF_FAILURE';
export const GET_STAFF_MEMBER_REQUEST = 'GET_STAFF_MEMBER_REQUEST';
export const GET_STAFF_MEMBER_SUCCESS = 'GET_STAFF_MEMBER_SUCCESS';
export const GET_STAFF_MEMBER_FAILURE = 'GET_STAFF_MEMBER_FAILURE';
export const CREATE_STAFF_REQUEST = 'CREATE_STAFF_REQUEST';
export const CREATE_STAFF_SUCCESS = 'CREATE_STAFF_SUCCESS';
export const CREATE_STAFF_FAILURE = 'CREATE_STAFF_FAILURE';
export const UPDATE_STAFF_REQUEST = 'UPDATE_STAFF_REQUEST';
export const UPDATE_STAFF_SUCCESS = 'UPDATE_STAFF_SUCCESS';
export const UPDATE_STAFF_FAILURE = 'UPDATE_STAFF_FAILURE';
export const DELETE_STAFF_REQUEST = 'DELETE_STAFF_REQUEST';
export const DELETE_STAFF_SUCCESS = 'DELETE_STAFF_SUCCESS';
export const DELETE_STAFF_FAILURE = 'DELETE_STAFF_FAILURE';
export const CLEAR_STAFF_ERROR = 'CLEAR_STAFF_ERROR';

import { StaffState, Action, Staff } from '../../types';

// Initial State
const initialState: StaffState = {
  staff: [],
  selectedStaff: null,
  isLoading: false,
  error: null,
};

// Reducer
export default function staffReducer(state = initialState, action: Action): StaffState {
  switch (action.type) {
    case GET_STAFF_REQUEST:
    case GET_STAFF_MEMBER_REQUEST:
    case CREATE_STAFF_REQUEST:
    case UPDATE_STAFF_REQUEST:
    case DELETE_STAFF_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_STAFF_SUCCESS:
      return {
        ...state,
        isLoading: false,
        staff: action.payload as Staff[],
        error: null,
      };

    case GET_STAFF_MEMBER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedStaff: action.payload as Staff,
        error: null,
      };

    case CREATE_STAFF_SUCCESS:
      return {
        ...state,
        isLoading: false,
        staff: [...state.staff, action.payload as Staff],
        error: null,
      };

    case UPDATE_STAFF_SUCCESS:
      return {
        ...state,
        isLoading: false,
        staff: state.staff.map((staffMember) =>
          staffMember.id === (action.payload as Staff).id ? (action.payload as Staff) : staffMember
        ),
        selectedStaff: action.payload as Staff,
        error: null,
      };

    case DELETE_STAFF_SUCCESS:
      return {
        ...state,
        isLoading: false,
        staff: state.staff.filter((staffMember) => staffMember.id !== action.payload),
        error: null,
      };

    case GET_STAFF_FAILURE:
    case GET_STAFF_MEMBER_FAILURE:
    case CREATE_STAFF_FAILURE:
    case UPDATE_STAFF_FAILURE:
    case DELETE_STAFF_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload as string,
      };

    case CLEAR_STAFF_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}
