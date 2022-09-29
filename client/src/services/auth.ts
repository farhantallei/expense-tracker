import makeRequest from './makeRequest';

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  username: string;
  createdAt: number;
}

export interface VerifyRequest {
  id: string;
}

const prefix = 'auth';

export function register(data: AuthRequest) {
  return makeRequest<AuthResponse, AuthRequest>(`${prefix}/register`, {
    method: 'POST',
    data,
  });
}

export function login(data: AuthRequest) {
  return makeRequest<AuthResponse, AuthRequest>(`${prefix}/login`, {
    method: 'POST',
    data,
  });
}

export function verify(data: VerifyRequest) {
  return makeRequest<{ status: 'ok' }, VerifyRequest>(`${prefix}/verify`, {
    method: 'POST',
    data,
  });
}
