import { useRef } from "react"

import ky from "ky"

import { useStore } from "mobx/utils"
import { getSecureValue, setSecureValue } from "utils/keychain"

const { API_URL } = require("config/env")

function isTokenExpired(token) {
  const expiry = JSON.parse(atob(token.split(".")[1])).exp
  return Math.floor(new Date().getTime() / 1000) >= expiry
}

export const useSetupApiClients = () => {
  const baseClient = useRef(ky.create({ prefixUrl: API_URL }))
  const { userStore } = useStore()

  const handleRefreshToken = async () => {
    const refreshToken = await getSecureValue("refreshToken")
    // todo: check refresh token expiration date and handle 401
    if (refreshToken) {
      const data = <any>(
        await baseClient.current
          .post("users/token-refresh", { json: { refresh: refreshToken } })
          .json()
      )
      if (data?.access) {
        await setSecureValue("accessToken", data.access)
        userStore.setIsAuthenticated(true)
        return data.access
      }
    }
    userStore.setIsAuthenticated(false)
    return null
  }

  const client = useRef(
    baseClient.current.extend({
      hooks: {
        beforeRequest: [
          async (request) => {
            const accessToken = await getSecureValue("accessToken")
            if (!accessToken || isTokenExpired(accessToken)) {
              await handleRefreshToken()
            } else {
              request.headers.set("Authorization", `Bearer ${accessToken}`)
            }
          },
        ],
        afterResponse: [
          async (request, options, response) => {
            if (response.status === 403 || response.status === 401) {
              const accessToken = await handleRefreshToken()
              request.headers.set("Authorization", `Bearer ${accessToken}`)
              return ky(request)
            }
            return response
          },
        ],
      },
    }),
  )

  return { baseClient: baseClient.current, client: client.current }
}
