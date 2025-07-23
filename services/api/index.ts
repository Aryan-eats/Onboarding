import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RiderData, AuthResponse, ApiResponse } from '../../types/api';

const API_BASE = process.env.API_BASE || 'https://api.yourservice.com/v1';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens
api.interceptors.request.use((config: AxiosRequestConfig) => {
  // Add auth token if exists
  const token = ''; // Get from auth store
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const AuthService = {
  verifyAadhar: async (aadhar: string): Promise<boolean> => {
    const response = await api.post<ApiResponse<{ verified: boolean }>>('/verify/aadhar', { aadhar });
    return response.data.data?.verified || false;
  },

  completeOnboarding: async (data: RiderData): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/riders/onboard', data);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Onboarding failed');
    }
    return response.data.data;
  },
};

export const RiderService = {
  getProfile: async (riderId: string): Promise<RiderProfile> => {
    const response = await api.get<ApiResponse<RiderProfile>>(`/riders/${riderId}`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to load rider profile');
    }
    return response.data.data;
  },
};