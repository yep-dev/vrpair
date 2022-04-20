import React, { useRef, FC, useContext, createContext } from "react"

import ky from "ky"
import { KyInstance } from "ky/distribution/types/ky"
import { useQueryClient } from "react-query"

import { useStore } from "mobx/utils"
import { useLogout } from "utils/auth"
import { getSecureValue, setSecureValue } from "utils/keychain"
import { atob } from "utils/misc"

const { API_URL } = require("config/env")

const isTokenExpired = (token) => {
  const expiry = JSON.parse(atob(token.split(".")[1])).exp
  return Math.floor(new Date().getTime() / 1000) >= expiry
}

export const ClientProvider: FC = ({ children }) => {
  const anonymous = useRef(ky.create({ prefixUrl: API_URL }))
  const { userStore } = useStore()
  const queryClient = useQueryClient()
  const logout = useLogout()

  const handleRefreshToken = async (isStaff) => {
    const refreshToken = await getSecureValue(isStaff ? "staffRefreshToken" : "refreshToken")
    const setAuthenticated = isStaff ? userStore.setStaffAuthenticated : userStore.setAuthenticated

    if (refreshToken && !isTokenExpired(refreshToken)) {
      try {
        const data = await queryClient.fetchQuery(
          "refresh",
          (): Promise<{ access: string }> =>
            anonymous.current
              .post("users/refresh-token", { json: { refresh: refreshToken } })
              .json(),
        )
        if (data?.access) {
          await setSecureValue(isStaff ? "staffAccessToken" : "accessToken", data.access)
          setAuthenticated(true)
          return data.access
        }
      } catch {}
    }
    await logout()
    return null
  }

  const getHooks = ({ isStaff }) => ({
    beforeRequest: [
      async (request) => {
        const accessToken = await getSecureValue(isStaff ? "staffAccessToken" : "accessToken")
        if (!accessToken || isTokenExpired(accessToken)) {
          await handleRefreshToken(isStaff)
        } else {
          request.headers.set("Authorization", `Bearer ${accessToken}`)
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 403 || response.status === 401) {
          const refreshToken = await getSecureValue(isStaff ? "staffRefreshToken" : "refreshToken")
          if (isTokenExpired(refreshToken)) {
            const accessToken = await handleRefreshToken(isStaff)
            request.headers.set("Authorization", `Bearer ${accessToken}`)
            return ky(request)
          } else {
            await logout()
            return null
          }
        }
        return response
      },
    ],
  })

  const authenticated = useRef(
    anonymous.current.extend({
      hooks: getHooks({ isStaff: false }),
    }),
  )

  const staff = useRef(
    anonymous.current.extend({
      hooks: getHooks({ isStaff: true }),
    }),
  )

  return (
    <ClientContext.Provider
      value={{
        anonymous: anonymous.current,
        authenticated: authenticated.current,
        staff: staff.current,
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}

export type Client = {
  anonymous: KyInstance
  authenticated: KyInstance
  staff: KyInstance
}

// incorrect context type to accomodate for initial null,
// should be consumed with hook anyway - it provides the correct type
export const ClientContext = createContext<any>(null)
export const useClient = () => useContext<Client>(ClientContext)
