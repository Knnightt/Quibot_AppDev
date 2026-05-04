// Action Types
export const GET_APPOINTMENTS_REQUEST = 'GET_APPOINTMENTS_REQUEST';
export const GET_APPOINTMENTS_SUCCESS = 'GET_APPOINTMENTS_SUCCESS';
export const GET_APPOINTMENTS_FAILURE = 'GET_APPOINTMENTS_FAILURE';
export const GET_APPOINTMENT_REQUEST = 'GET_APPOINTMENT_REQUEST';
export const GET_APPOINTMENT_SUCCESS = 'GET_APPOINTMENT_SUCCESS';
export const GET_APPOINTMENT_FAILURE = 'GET_APPOINTMENT_FAILURE';
export const CREATE_APPOINTMENT_REQUEST = 'CREATE_APPOINTMENT_REQUEST';
export const CREATE_APPOINTMENT_SUCCESS = 'CREATE_APPOINTMENT_SUCCESS';
export const CREATE_APPOINTMENT_FAILURE = 'CREATE_APPOINTMENT_FAILURE';
export const UPDATE_APPOINTMENT_REQUEST = 'UPDATE_APPOINTMENT_REQUEST';
export const UPDATE_APPOINTMENT_SUCCESS = 'UPDATE_APPOINTMENT_SUCCESS';
export const UPDATE_APPOINTMENT_FAILURE = 'UPDATE_APPOINTMENT_FAILURE';
export const DELETE_APPOINTMENT_REQUEST = 'DELETE_APPOINTMENT_REQUEST';
export const DELETE_APPOINTMENT_SUCCESS = 'DELETE_APPOINTMENT_SUCCESS';
export const DELETE_APPOINTMENT_FAILURE = 'DELETE_APPOINTMENT_FAILURE';
export const CLEAR_APPOINTMENT_ERROR = 'CLEAR_APPOINTMENT_ERROR';

import { AppointmentsState, Action, Appointment } from '../../types';

// Initial State
const initialState: AppointmentsState = {
  appointments: [],
  selectedAppointment: null,
  isLoading: false,
  error: null,
};

// Reducer
export default function appointmentsReducer(state = initialState, action: Action): AppointmentsState {
  switch (action.type) {
    case GET_APPOINTMENTS_REQUEST:
    case GET_APPOINTMENT_REQUEST:
    case CREATE_APPOINTMENT_REQUEST:
    case UPDATE_APPOINTMENT_REQUEST:
    case DELETE_APPOINTMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        appointments: action.payload as Appointment[],
        error: null,
      };

    case GET_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedAppointment: action.payload as Appointment,
        error: null,
      };

    case CREATE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        appointments: [...state.appointments, action.payload as Appointment],
        error: null,
      };

    case UPDATE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        appointments: state.appointments.map((appointment) =>
          appointment.id === (action.payload as Appointment).id ? (action.payload as Appointment) : appointment
        ),
        selectedAppointment: action.payload as Appointment,
        error: null,
      };

    case DELETE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        appointments: state.appointments.filter((appointment) => appointment.id !== action.payload),
        error: null,
      };

    case GET_APPOINTMENTS_FAILURE:
    case GET_APPOINTMENT_FAILURE:
    case CREATE_APPOINTMENT_FAILURE:
    case UPDATE_APPOINTMENT_FAILURE:
    case DELETE_APPOINTMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload as string,
      };

    case CLEAR_APPOINTMENT_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}
