import { useSetupApiClients } from "api/apiClients"
import { profilesApi } from "api/profiles"
import { usersApi } from "api/users"
import { useStore } from "mobx/utils"
import React, { FC, useContext, useEffect, useRef, useState, createContext } from "react"
import { getSecureValue, setSecureValue } from "utils/keychain"

const setupApis = (clients) => ({
  profiles: profilesApi(clients),
  users: usersApi(clients),
})

export const ApiProvider: FC = ({ children }) => {
  const { userStore } = useStore()
  const handleRefreshToken = useRef<() => void>()
  const clients = useSetupApiClients(handleRefreshToken)
  const [apis] = useState(setupApis(clients))

  // refresh token handler needs to access api client reference whle client is being created
  // refresh handler is set here after creating the client to stop this circular dependency
  useEffect(() => {
    handleRefreshToken.current = async () => {
      const refreshToken = await getSecureValue("refreshToken")
      if (refreshToken) {
        const data = await apis.users.tokenRefresh({ refreshToken })
        if (data?.access) {
          await setSecureValue("accessToken", data.access)
          userStore.setIsAuthenticated(true)
        } else {
          throw Error("Failed to refresh token")
        }
      } else {
        throw Error("No refresh token")
      }
    }
  }, [])

  return <ApiContext.Provider value={{ ...apis, ...clients }}>{children}</ApiContext.Provider>
}

// incorrect context type to accomodate for initial null,
// should be consumed with hook anyway - it provides the correct type
export const ApiContext = createContext<any>(null)
export const useApi = () => useContext<ReturnType<typeof setupApis>>(ApiContext)
