// Action Types
export const GET_PETS_REQUEST = 'GET_PETS_REQUEST';
export const GET_PETS_SUCCESS = 'GET_PETS_SUCCESS';
export const GET_PETS_FAILURE = 'GET_PETS_FAILURE';
export const GET_PET_REQUEST = 'GET_PET_REQUEST';
export const GET_PET_SUCCESS = 'GET_PET_SUCCESS';
export const GET_PET_FAILURE = 'GET_PET_FAILURE';
export const CREATE_PET_REQUEST = 'CREATE_PET_REQUEST';
export const CREATE_PET_SUCCESS = 'CREATE_PET_SUCCESS';
export const CREATE_PET_FAILURE = 'CREATE_PET_FAILURE';
export const UPDATE_PET_REQUEST = 'UPDATE_PET_REQUEST';
export const UPDATE_PET_SUCCESS = 'UPDATE_PET_SUCCESS';
export const UPDATE_PET_FAILURE = 'UPDATE_PET_FAILURE';
export const DELETE_PET_REQUEST = 'DELETE_PET_REQUEST';
export const DELETE_PET_SUCCESS = 'DELETE_PET_SUCCESS';
export const DELETE_PET_FAILURE = 'DELETE_PET_FAILURE';
export const CLEAR_PET_ERROR = 'CLEAR_PET_ERROR';

import { PetsState, Action, Pet } from '../../types';

// Initial State
const initialState: PetsState = {
  pets: [],
  selectedPet: null,
  isLoading: false,
  error: null,
};

// Reducer
export default function petsReducer(state = initialState, action: Action): PetsState {
  switch (action.type) {
    case GET_PETS_REQUEST:
    case GET_PET_REQUEST:
    case CREATE_PET_REQUEST:
    case UPDATE_PET_REQUEST:
    case DELETE_PET_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_PETS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pets: action.payload as Pet[],
        error: null,
      };

    case GET_PET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedPet: action.payload as Pet,
        error: null,
      };

    case CREATE_PET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pets: [...state.pets, action.payload as Pet],
        error: null,
      };

    case UPDATE_PET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pets: state.pets.map((pet) =>
          pet.id === (action.payload as Pet).id ? (action.payload as Pet) : pet
        ),
        selectedPet: action.payload as Pet,
        error: null,
      };

    case DELETE_PET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pets: state.pets.filter((pet) => pet.id !== action.payload),
        error: null,
      };

    case GET_PETS_FAILURE:
    case GET_PET_FAILURE:
    case CREATE_PET_FAILURE:
    case UPDATE_PET_FAILURE:
    case DELETE_PET_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload as string,
      };

    case CLEAR_PET_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}
