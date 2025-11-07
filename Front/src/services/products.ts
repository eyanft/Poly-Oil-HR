import { API_BASE_URL } from '../config';

const PRODUCTS_ENDPOINT = `${API_BASE_URL}/products`;

type RequestOptions = RequestInit & {
  accessToken?: string | null;
};

async function request<T>(path: string, options: RequestOptions = {}) {
  const { accessToken, headers, ...init } = options;
  const finalHeaders = new Headers(headers);

  if (accessToken) {
    finalHeaders.set('Authorization', `Bearer ${accessToken}`);
  }

  if (!(init.body instanceof FormData)) {
    finalHeaders.set('Content-Type', 'application/json');
  }

  const response = await fetch(path, {
    ...init,
    headers: finalHeaders,
  });

  if (!response.ok) {
    let message = 'Une erreur est survenue';
    try {
      const errorBody = (await response.json()) as { message?: string };
      if (errorBody?.message) message = errorBody.message;
    } catch {
      // ignore json parse errors
    }
    throw new Error(message);
  }

  if (response.status === 204) return undefined as T;

  return (await response.json()) as T;
}

export type ProductPayload = {
  name: string;
  category: string;
  description: string;
  image: string;
  volume: string;
  oilType?: string;
  viscosity?: string;
  apiStandard?: string;
  aceaStandard?: string;
  manufacturerStandards?: string;
  applications?: string;
  technology?: string;
  packaging?: string;
  specifications?: string[];
  features?: string[];
  price?: string;
};

export type Product = ProductPayload & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export function fetchProducts() {
  return request<Product[]>(PRODUCTS_ENDPOINT, {
    method: 'GET',
  });
}

export function createProduct(payload: ProductPayload, accessToken: string) {
  return request<Product>(PRODUCTS_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(payload),
    accessToken,
  });
}

export function updateProduct(id: string, payload: ProductPayload, accessToken: string) {
  return request<Product>(`${PRODUCTS_ENDPOINT}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    accessToken,
  });
}

export function deleteProduct(id: string, accessToken: string) {
  return request<void>(`${PRODUCTS_ENDPOINT}/${id}`, {
    method: 'DELETE',
    accessToken,
  });
}

