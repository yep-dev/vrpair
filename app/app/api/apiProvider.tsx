import React, { FC, useContext, useState, createContext } from "react"

import { useSetupApiClients } from "api/apiClients"
import { likesApi } from "api/likes"
import { profilesApi } from "api/profiles"
import { usersApi } from "api/users"

const setupApis = (clients) => ({
  likes: likesApi(clients),
  profiles: profilesApi(clients),
  users: usersApi(clients),
})

export const ApiProvider: FC = ({ children }) => {
  const clients = useSetupApiClients()
  const [apis] = useState(setupApis(clients))

  return <ApiContext.Provider value={{ ...apis, ...clients }}>{children}</ApiContext.Provider>
}

// incorrect context type to accomodate for initial null,
// should be consumed with hook anyway - it provides the correct type
export const ApiContext = createContext<any>(null)
export const useApi = () => useContext<ReturnType<typeof setupApis>>(ApiContext)
