import { API_BASE_URL } from '../config';

export type QuoteRequest = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  productName?: string;
  message?: string;
};

export type QuoteResponse = {
  success: boolean;
  message?: string;
};

export async function sendQuoteRequest(data: QuoteRequest): Promise<QuoteResponse> {
  const response = await fetch(`${API_BASE_URL}/quote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = (body as { error?: string })?.error ?? 'Impossible d’envoyer la demande.';
    throw new Error(message);
  }

  return body as QuoteResponse;
}
