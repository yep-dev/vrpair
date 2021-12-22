import { useRef } from "react"

import ky from "ky"

import { getSecureValue } from "utils/keychain"

const { API_URL } = require("config/env")

function isTokenExpired(token) {
  const expiry = JSON.parse(atob(token.split(".")[1])).exp
  return Math.floor(new Date().getTime() / 1000) >= expiry
}

export const useSetupApiClients = (handleRefreshToken) => {
  const baseClient = useRef(ky.create({ prefixUrl: API_URL }))

  const client = useRef(
    baseClient.current.extend({
      hooks: {
        beforeRequest: [
          async (request) => {
            const accessToken = await getSecureValue("accessToken")
            if (!accessToken || isTokenExpired(accessToken)) {
              await handleRefreshToken.current()
            } else {
              request.headers.set("Authorization", `Bearer ${accessToken}`)
            }
          },
        ],
        afterResponse: [
          async (request, options, response) => {
            if (response.status === 403 || response.status === 401) {
              const accessToken = await handleRefreshToken.current()
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
