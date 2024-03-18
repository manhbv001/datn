import { ApiResponse } from '@/models/common';

const fetcher = {
  serverReq: async <T>(
    url: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> => {
    const baseUrl = process.env.API_ENDPOINT;

    const res = await fetch(`${baseUrl}/${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY!,
      },
    });
    const data = await res.json();

    if (res.ok) return data;
    else throw new Error(data.message || res.statusText, data);
  },
  clientReq: async <T>(
    url: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const res = await fetch(`${baseUrl}/${url}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
    const data = await res.json();

    return data;
  },
};

export default fetcher;
