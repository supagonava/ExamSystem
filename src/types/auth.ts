export interface User {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'USER';
  firstName?: string;
  lastName?: string;
}

export interface LoginCredentials {
  email?: string;
  username?: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
