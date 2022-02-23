import { useClient } from "apiClient/ClientProvider"

export const useMutator = <T>(): ((config: any) => Promise<T>) => {
  const client = useClient()

  return ({ url, params, ...options }) =>
    client.authenticated(url.slice(1), { searchParams: params, ...options }).json()
}
