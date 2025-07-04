export namespace AuthTypes {
  export type User = {
    _id: number;
    name: string;
    profile?: string;
  };

  export type UserState = {
    currentUser: User;
    setCurrentUser: (user: User) => void;
    currentRecipient: User | null;
    setCurrentRecipient: (user: User | null) => void;
  };

  export interface AuthUser {
    _id: string;
    name: string;
    profile: string;
  }

  export interface AuthStore {
    authUser: AuthUser | null;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    onlineUsers: string[];
  }
}
