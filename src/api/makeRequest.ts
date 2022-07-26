import axios, { AxiosRequestConfig } from "axios";

const api = import.meta.env.VITE_API_URL;

interface RequestOption extends AxiosRequestConfig {
  token?: string;
}

export interface MessageResponse {
  message: string;
  error: boolean;
}

export interface AuthResponse extends MessageResponse {
  token?: string;
}

export interface PayloadResponse<D> extends MessageResponse {
  payload: D;
}

export interface ValidationResponse extends MessageResponse {
  errors: {
    property: string;
    constraints: string[];
  }[];
}

const baseApi = axios.create({
  baseURL: api,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default async function <D>(
  url: string,
  options: RequestOption = {
    method: "GET",
  }
) {
  const response = await baseApi(`${api}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      ...(options.token && { "x-access-token": options.token }),
    },
  });

  if (
    response.data &&
    "auth" in response.data &&
    response.data.auth === false
  ) {
    window.location.href = "/login";
  }

  return response.data as D;
}
