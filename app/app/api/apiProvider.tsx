import { setupApiClient } from "api/apiClient"
import { profilesApi } from "api/profiles"
import React, { FC, useContext, useRef, useState } from "react"

export const ApiContext = React.createContext<any>(null)

const setupApis = (client) => ({
  profiles: profilesApi(client),
})

type clientType = ReturnType<typeof setupApiClient>
type apisType = ReturnType<typeof setupApis>

export const ApiProvider: FC = ({ children }) => {
  const client = useRef<clientType>(setupApiClient())
  const [apis] = useState<apisType>(setupApis(client.current))

  return (
    <ApiContext.Provider value={{ ...apis, client: client.current }}>
      {children}
    </ApiContext.Provider>
  )
}
export const useApi = () => useContext<clientType & apisType>(ApiContext)
