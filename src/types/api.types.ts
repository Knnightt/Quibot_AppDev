// User Types
export interface User {
  id: number;
  email: string;
  username?: string;
  roles: string[];
  isVerified: boolean;
  fullName?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile {
  fullName?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface UserDetails extends User {
  profile?: UserProfile;
}

// Customer Types
export interface Customer {
  id: number;
  email: string;
  username: string;
  isVerified: boolean;
}

// Pet Types
export interface PetOwner {
  id: number;
  email: string;
  username?: string;
}

export interface Pet {
  id: number;
  name: string;
  species: string;
  breed?: string;
  age?: number;
  gender?: string;
  weight?: number;
  lifeStage?: string;
  coatType?: string;
  temperament?: string;
  isNeutered?: boolean;
  isVaccinated?: boolean;
  medicalNotes?: string;
  allergies?: string;
  photo?: string;
  isActive: boolean;
  owner: PetOwner;
  createdAt?: string;
  updatedAt?: string;
}

// Staff Types
export interface StaffUser {
  id: number;
  email: string;
  name?: string;
}

export interface Staff {
  id: number;
  staffId: string;
  user: StaffUser;
  staffRole: string;
  specializations: string[];
  biography?: string;
  employmentStatus?: string;
  hourlyRate?: string;
  experienceYears?: number;
  hireDate?: string;
  workingDays?: string[];
  startTime?: string;
  endTime?: string;
  canHandleAggressivePets?: boolean;
  isCertified?: boolean;
}

// Service Types
export interface Service {
  id: number;
  name: string;
  price?: number;
}

// Appointment Types
export interface AppointmentCustomer {
  id: number;
  email: string;
}

export interface AppointmentPet {
  id: number;
  name: string;
  species?: string;
}

export interface AppointmentService {
  id: number;
  name: string;
  price?: number;
}

export interface AppointmentStaff {
  id: number;
  staffId: string;
  staffRole?: string;
}

export interface Appointment {
  id: number;
  customer: AppointmentCustomer;
  pet: AppointmentPet;
  service: AppointmentService;
  assignedStaff: AppointmentStaff | null;
  startAt: string;
  endAt: string;
  status: string;
  amount: number;
  isPaid: boolean;
  notes?: string;
  groomerNotes?: string;
  discount?: number;
  tax?: number;
  paymentMethod?: string;
  reminderSent?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Auth Request/Response Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterCredentials {
  email: string;
  username: string;
  password: string;
  fullName?: string;
}

export interface RegisterResponse {
  message: string;
  user: Customer;
  emailVerificationSent: boolean;
}

export interface GoogleOAuthCredentials {
  id_token: string;
}

export interface VerifyEmailCredentials {
  token: string;
}

export interface VerifyEmailResponse {
  message: string;
  user: Customer;
}

// User Management Request Types
export interface CreateUserRequest {
  email: string;
  password: string;
  roles: string[];
  username?: string;
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface UpdateUserRequest {
  email?: string;
  username?: string;
  roles?: string[];
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

// Customer Request Types
export interface CreateCustomerRequest {
  email: string;
  username: string;
  password: string;
}

export interface UpdateCustomerRequest {
  email?: string;
  username?: string;
}

// Pet Request Types
export interface CreatePetRequest {
  name: string;
  species: string;
  owner_id?: number;
  breed?: string;
  age?: number;
  gender?: string;
  weight?: number;
  lifeStage?: string;
  coatType?: string;
  temperament?: string;
  isNeutered?: boolean;
  isVaccinated?: boolean;
  medicalNotes?: string;
  allergies?: string;
  photo?: string;
  isActive?: boolean;
}

export interface UpdatePetRequest {
  name?: string;
  species?: string;
  breed?: string;
  age?: number;
  gender?: string;
  weight?: number;
  lifeStage?: string;
  coatType?: string;
  temperament?: string;
  isNeutered?: boolean;
  isVaccinated?: boolean;
  medicalNotes?: string;
  allergies?: string;
  photo?: string;
  isActive?: boolean;
}

// Appointment Request Types
export interface CreateAppointmentRequest {
  pet_id: number;
  service_id: number;
  startAt: string;
  endAt: string;
  amount: number;
  customer_id?: number;
  status?: string;
  notes?: string;
  discount?: number;
  tax?: number;
  paymentMethod?: string;
  assigned_staff_id?: number;
}

export interface UpdateAppointmentRequest {
  startAt?: string;
  endAt?: string;
  status?: string;
  notes?: string;
  groomerNotes?: string;
  amount?: number;
  discount?: number;
  tax?: number;
  isPaid?: boolean;
  paymentMethod?: string;
  assigned_staff_id?: number | null;
}

// Staff Request Types
export interface CreateStaffRequest {
  email: string;
  password: string;
  name: string;
  username?: string;
  phone?: string;
  staffId?: string;
  staffRole?: string;
  specializations?: string[];
  biography?: string;
  employmentStatus?: string;
  hourlyRate?: string;
  experienceYears?: number;
  workingDays?: string[];
  canHandleAggressivePets?: boolean;
  isCertified?: boolean;
}

export interface UpdateStaffRequest {
  email?: string;
  password?: string;
  name?: string;
  username?: string;
  phone?: string;
  staffId?: string;
  staffRole?: string;
  specializations?: string[];
  biography?: string;
  employmentStatus?: string;
  hourlyRate?: string;
  experienceYears?: number;
  workingDays?: string[];
  canHandleAggressivePets?: boolean;
  isCertified?: boolean;
}

// API Response Types
export interface ApiError {
  message: string;
  detail?: string;
  status?: number;
}

export interface DeleteResponse {
  status: string;
  message?: string;
}

// Dashboard Stats
export interface DashboardStat {
  id: string;
  label: string;
  value: string | number;
  subtitle: string;
}

export interface DashboardData {
  stats: DashboardStat[];
  upcomingAppointments?: Appointment[];
  recentPets?: Pet[];
}
