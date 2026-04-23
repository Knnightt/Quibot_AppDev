// Auth Types
export interface User {
  id?: string;
  email: string;
  fullName?: string;
  [key: string]: any;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  registerSuccess: boolean;
}

// API Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: User;
}

export interface ApiError {
  message: string;
  detail?: string;
}

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

// Dashboard Types
export interface DashboardStat {
  id: string;
  label: string;
  value: string | number;
  subtitle: string;
}

// App State
export interface AppState {
  auth: AuthState;
}
