// Action Types
export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';
export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';
export const CLEAR_USER_ERROR = 'CLEAR_USER_ERROR';

import { UsersState, Action, User } from '../../types';

// Initial State
const initialState: UsersState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
};

// Reducer
export default function usersReducer(state = initialState, action: Action): UsersState {
  switch (action.type) {
    case GET_USERS_REQUEST:
    case GET_USER_REQUEST:
    case CREATE_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload as User[],
        error: null,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedUser: action.payload as User,
        error: null,
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: [...state.users, action.payload as User],
        error: null,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: state.users.map((user) =>
          user.id === (action.payload as User).id ? (action.payload as User) : user
        ),
        selectedUser: action.payload as User,
        error: null,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: state.users.filter((user) => user.id !== action.payload),
        error: null,
      };

    case GET_USERS_FAILURE:
    case GET_USER_FAILURE:
    case CREATE_USER_FAILURE:
    case UPDATE_USER_FAILURE:
    case DELETE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload as string,
      };

    case CLEAR_USER_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}
