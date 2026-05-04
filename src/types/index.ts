// Re-export all API types
export * from './api.types';

// Redux Action Types
export interface Action {
  type: string;
  payload?: any;
}

// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainStackParamList = {
  Dashboard: undefined;
  Profile: undefined;
};

// Component Props Types
export interface CustomButtonProps {
  containerStyle?: object;
  textStyle?: object;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface CustomTextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  textStyle?: object;
  containerStyle?: object;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export interface NestedCardProps {
  title?: string;
  children: React.ReactNode;
  style?: object;
}

export interface NestedCardSectionProps {
  label?: string;
  children: React.ReactNode;
  style?: object;
}

// Auth State (using types from api.types)
import { User, Customer, Pet, Appointment, Staff, DashboardStat } from './api.types';

export interface AuthState {
  user: User | Customer | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  registerSuccess: boolean;
}

// Users State
export interface UsersState {
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;
}

// Customers State
export interface CustomersState {
  customers: Customer[];
  selectedCustomer: Customer | null;
  isLoading: boolean;
  error: string | null;
}

// Pets State
export interface PetsState {
  pets: Pet[];
  selectedPet: Pet | null;
  isLoading: boolean;
  error: string | null;
}

// Appointments State
export interface AppointmentsState {
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  isLoading: boolean;
  error: string | null;
}

// Staff State
export interface StaffState {
  staff: Staff[];
  selectedStaff: Staff | null;
  isLoading: boolean;
  error: string | null;
}

// Dashboard State
export interface DashboardState {
  stats: DashboardStat[];
  isLoading: boolean;
  error: string | null;
}

// App State
export interface AppState {
  auth: AuthState;
  users: UsersState;
  customers: CustomersState;
  pets: PetsState;
  appointments: AppointmentsState;
  staff: StaffState;
  dashboard: DashboardState;
}
