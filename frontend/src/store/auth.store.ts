import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
import type { AxiosResponse } from 'axios';
import type { Socket } from 'socket.io-client';
import type { AuthStore, AuthUser } from '../types/auth';
import { BasePath } from '../config';

const BASE_URL = import.meta.env.MODE === 'development' ? `${BasePath}` : '/';

interface AuthStoreFun extends AuthStore {
  socket: Socket | null;
  checkAuth: () => Promise<void>;
  signup: (data: Record<string, any>) => Promise<void>;
  login: (data: Record<string, any>) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Record<string, any>) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useAuthStore = create<AuthStoreFun>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res: AxiosResponse<AuthUser> = await axiosInstance.get('/auth/check');
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error: unknown) {
      console.error('Error in checkAuth:', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: Record<string, any>) => {
    set({ isSigningUp: true });
    try {
      const res: AxiosResponse<AuthUser> = await axiosInstance.post('/auth/signup', data);
      set({ authUser: res.data });
      toast.success('Account created successfully');
      get().connectSocket();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: Record<string, any>) => {
    set({ isLoggingIn: true });
    try {
      const res: AxiosResponse<AuthUser> = await axiosInstance.post('/auth/login', data);
      set({ authUser: res.data });
      toast.success('Logged in successfully');
      get().connectSocket();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      toast.success('Logged out successfully');
      get().disconnectSocket();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  },

  updateProfile: async (data: Record<string, any>) => {
    set({ isUpdatingProfile: true });
    try {
      const res: AxiosResponse<AuthUser> = await axiosInstance.put('/auth/update-profile', data);
      set({ authUser: res.data });
      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Error in updateProfile:', error);
      toast.error(error.response?.data?.message || 'Profile update failed');
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket: Socket = io(BASE_URL, {
      auth: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket });

    socket.on('getOnlineUsers', (userIds: string[]) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket && socket.connected) socket.disconnect();
  },
}));
