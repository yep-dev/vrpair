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
          async () => {
            const accessToken = await getSecureValue("accessToken")
            if (!accessToken || isTokenExpired(accessToken)) {
              await handleRefreshToken.current()
            }
          },
          async (request) => {
            const accessToken = await getSecureValue("accessToken")

            if (accessToken) {
              request.headers.set("Authorization", `Bearer ${accessToken}`)
            }
          },
        ],
      },
    }),
  )

  return { baseClient: baseClient.current, client: client.current }
}
