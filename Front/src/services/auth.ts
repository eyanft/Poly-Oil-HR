import { AUTH_ENDPOINT } from '../config';

type LoginResponse = {
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
};

async function request<T>(input: RequestInfo | URL, init?: RequestInit) {
  const response = await fetch(input, init);
  if (!response.ok) {
    let message = 'Une erreur est survenue';
    try {
      const data = (await response.json()) as { message?: string };
      if (data?.message) message = data.message;
    } catch {
      // ignore json parse errors
    }
    throw new Error(message);
  }
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export async function login(email: string, password: string) {
  return request<LoginResponse>(`${AUTH_ENDPOINT}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  });
}

export async function logout() {
  await request(`${AUTH_ENDPOINT}/logout`, {
    method: 'POST',
    credentials: 'include'
  });
}

export async function refresh() {
  return request<{ accessToken: string }>(`${AUTH_ENDPOINT}/refresh`, {
    method: 'POST',
    credentials: 'include'
  });
}

export async function fetchProfile(accessToken: string) {
  return request<LoginResponse['user']>(`${AUTH_ENDPOINT}/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

