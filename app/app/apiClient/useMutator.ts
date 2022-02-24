import { useClient } from "apiClient/ClientProvider"

type RequestConfig = {
  method: "get" | "put" | "patch" | "post" | "delete"
  url: string
  params?: any
  data?: any
  responseType?: string
}

const mapConfig = ({ url = "", method, params, data, ...options }: RequestConfig) =>
  [url.slice(1), { method, searchParams: params, json: data }] as const

export const useAnonymous = <T>(): ((config: RequestConfig) => Promise<T>) => {
  const client = useClient()
  return (config) => client.anonymous(...mapConfig(config)).json()
}

export const useAuthenticated = <T>(): ((config: RequestConfig) => Promise<T>) => {
  const client = useClient()
  return (config) => client.authenticated(...mapConfig(config)).json()
}

export const useStaff = <T>(): ((config: RequestConfig) => Promise<T>) => {
  const client = useClient()
  return (config) => client.staff(...mapConfig(config)).json()
}
