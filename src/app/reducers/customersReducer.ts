// Action Types
export const GET_CUSTOMERS_REQUEST = 'GET_CUSTOMERS_REQUEST';
export const GET_CUSTOMERS_SUCCESS = 'GET_CUSTOMERS_SUCCESS';
export const GET_CUSTOMERS_FAILURE = 'GET_CUSTOMERS_FAILURE';
export const GET_CUSTOMER_REQUEST = 'GET_CUSTOMER_REQUEST';
export const GET_CUSTOMER_SUCCESS = 'GET_CUSTOMER_SUCCESS';
export const GET_CUSTOMER_FAILURE = 'GET_CUSTOMER_FAILURE';
export const CREATE_CUSTOMER_REQUEST = 'CREATE_CUSTOMER_REQUEST';
export const CREATE_CUSTOMER_SUCCESS = 'CREATE_CUSTOMER_SUCCESS';
export const CREATE_CUSTOMER_FAILURE = 'CREATE_CUSTOMER_FAILURE';
export const UPDATE_CUSTOMER_REQUEST = 'UPDATE_CUSTOMER_REQUEST';
export const UPDATE_CUSTOMER_SUCCESS = 'UPDATE_CUSTOMER_SUCCESS';
export const UPDATE_CUSTOMER_FAILURE = 'UPDATE_CUSTOMER_FAILURE';
export const DELETE_CUSTOMER_REQUEST = 'DELETE_CUSTOMER_REQUEST';
export const DELETE_CUSTOMER_SUCCESS = 'DELETE_CUSTOMER_SUCCESS';
export const DELETE_CUSTOMER_FAILURE = 'DELETE_CUSTOMER_FAILURE';
export const CLEAR_CUSTOMER_ERROR = 'CLEAR_CUSTOMER_ERROR';

import { CustomersState, Action, Customer } from '../../types';

// Initial State
const initialState: CustomersState = {
  customers: [],
  selectedCustomer: null,
  isLoading: false,
  error: null,
};

// Reducer
export default function customersReducer(state = initialState, action: Action): CustomersState {
  switch (action.type) {
    case GET_CUSTOMERS_REQUEST:
    case GET_CUSTOMER_REQUEST:
    case CREATE_CUSTOMER_REQUEST:
    case UPDATE_CUSTOMER_REQUEST:
    case DELETE_CUSTOMER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        customers: action.payload as Customer[],
        error: null,
      };

    case GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedCustomer: action.payload as Customer,
        error: null,
      };

    case CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        customers: [...state.customers, action.payload as Customer],
        error: null,
      };

    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        customers: state.customers.map((customer) =>
          customer.id === (action.payload as Customer).id ? (action.payload as Customer) : customer
        ),
        selectedCustomer: action.payload as Customer,
        error: null,
      };

    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        customers: state.customers.filter((customer) => customer.id !== action.payload),
        error: null,
      };

    case GET_CUSTOMERS_FAILURE:
    case GET_CUSTOMER_FAILURE:
    case CREATE_CUSTOMER_FAILURE:
    case UPDATE_CUSTOMER_FAILURE:
    case DELETE_CUSTOMER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload as string,
      };

    case CLEAR_CUSTOMER_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}
