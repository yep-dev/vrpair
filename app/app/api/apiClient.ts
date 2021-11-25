import ky from "ky"
import { getSecureValue } from "utils/keychain"
const { API_URL } = require("config/env")

export const setupApiClient = () =>
  ky.create({
    prefixUrl: API_URL,
    hooks: {
      beforeRequest: [
        async (request) => {
          const accessToken = await getSecureValue("accessToken")

          if (accessToken) {
            request.headers.set("Authorization", `Bearer ${accessToken}`)
          }
        },
      ],
    },
  })
