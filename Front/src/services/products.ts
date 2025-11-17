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

  try {
    const response = await fetch(path, {
      ...init,
      headers: finalHeaders,
    });

    if (!response.ok) {
      let message = 'Une erreur est survenue';
      let errorDetails: any = null;
      
      try {
        const errorBody = (await response.json()) as { message?: string; error?: string; details?: any };
        if (errorBody?.message) message = errorBody.message;
        else if (errorBody?.error) message = errorBody.error;
        errorDetails = errorBody;
      } catch (parseError) {
        // Si on ne peut pas parser le JSON, essayer de lire le texte
        try {
          const text = await response.text();
          if (text) message = text;
        } catch {
          // ignore
        }
      }

      // Messages d'erreur plus spécifiques selon le code de statut
      if (response.status === 400) {
        message = errorDetails?.message || 'Données invalides. Vérifiez les champs du formulaire.';
      } else if (response.status === 401) {
        message = 'Votre session a expiré. Veuillez vous reconnecter.';
      } else if (response.status === 403) {
        message = 'Vous n\'avez pas les permissions nécessaires.';
      } else if (response.status === 413) {
        message = 'L\'image est trop volumineuse. Veuillez utiliser une image plus petite.';
      } else if (response.status >= 500) {
        message = 'Erreur serveur. Veuillez réessayer plus tard.';
      }

      const error = new Error(message);
      (error as any).status = response.status;
      (error as any).details = errorDetails;
      throw error;
    }

    if (response.status === 204) return undefined as T;

    return (await response.json()) as T;
  } catch (err) {
    // Si c'est déjà une erreur qu'on a créée, la relancer
    if (err instanceof Error && (err as any).status) {
      throw err;
    }
    // Sinon, c'est une erreur réseau ou autre
    if (err instanceof Error) {
      throw new Error(`Erreur de connexion: ${err.message}`);
    }
    throw new Error('Une erreur inattendue est survenue');
  }
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


