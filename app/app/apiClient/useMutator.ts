import { AxiosRequestConfig } from "axios"

import { useClient } from "apiClient/ClientProvider"

export const useMutator = <T>(): ((config: AxiosRequestConfig) => Promise<T>) => {
  const client = useClient()

  return ({ url = "", method, params, data, ...options }) => {
    return client.authenticated(url.slice(1), { method, searchParams: params, json: data }).json()
  }
}
