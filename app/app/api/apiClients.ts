import { useRef } from "react"

import ky from "ky"
import { KyInstance } from "ky/distribution/types/ky"
import { useQueryClient } from "react-query"

import { useStore } from "mobx/utils"
import { getSecureValue, setSecureValue } from "utils/keychain"
import { atob } from "utils/misc"

const { API_URL } = require("config/env")

const isTokenExpired = (token) => {
  const expiry = JSON.parse(atob(token.split(".")[1])).exp
  return Math.floor(new Date().getTime() / 1000) >= expiry
}

export const useSetupApiClients = () => {
  const baseClient = useRef(ky.create({ prefixUrl: API_URL }))
  const { userStore } = useStore()
  const queryClient = useQueryClient()

  const handleRefreshToken = async (isStaff) => {
    const refreshToken = await getSecureValue(isStaff ? "staffRefreshToken" : "refreshToken")
    const setAuthenticated = isStaff ? userStore.setStaffAuthenticated : userStore.setAuthenticated

    if (refreshToken && !isTokenExpired(refreshToken)) {
      try {
        const data = await queryClient.fetchQuery(
          "refresh",
          (): Promise<{ access: string }> =>
            baseClient.current
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
    setAuthenticated(false)
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
          const accessToken = await handleRefreshToken(isStaff)
          request.headers.set("Authorization", `Bearer ${accessToken}`)
          return ky(request)
        }
        return response
      },
    ],
  })

  const client = useRef(
    baseClient.current.extend({
      hooks: getHooks({ isStaff: false }),
    }),
  )

  const staffClient = useRef(
    baseClient.current.extend({
      hooks: getHooks({ isStaff: true }),
    }),
  )

  return {
    baseClient: baseClient.current,
    client: client.current,
    staffClient: staffClient.current,
  }
}

export type TClients = {
  baseClient: KyInstance
  client: KyInstance
  staffClient: KyInstance
}
