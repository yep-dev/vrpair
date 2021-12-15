import { authorize } from "react-native-app-auth"

import { API_URL, OAUTH_DISCORD_CLIENT_ID } from "config/env"
import { useStore } from "mobx/utils"
import { setSecureValue } from "utils/keychain"

const discordConfig = {
  serviceConfiguration: {
    authorizationEndpoint: "https://discord.com/api/oauth2/authorize",
    tokenEndpoint: "https://discord.com/api/oauth2/token",
    revocationEndpoint: "https://discord.com/api/oauth2/token/revoke",
  },
  clientId: OAUTH_DISCORD_CLIENT_ID,
  redirectUrl: `${API_URL}/users/discord-login`,
  scopes: ["identify", "email"],
  usePKCE: false,
  useNonce: false,
  skipCodeExchange: true,
}

export const useDiscordLogin = () => {
  const { userStore } = useStore()

  return async () => {
    try {
      await authorize(discordConfig)
    } catch (error: any) {
      // collecting auth data in the error to allow for capturing other data than discord oauth
      // OIDAuthorizationService.m was modified to allow this, without it checks prevent returning anything else
      const accessToken = error?.userInfo?.accessToken
      const refreshToken = error?.userInfo?.refreshToken
      if (accessToken && refreshToken) {
        await setSecureValue("accessToken", accessToken)
        await setSecureValue("refreshToken", refreshToken)
        await userStore.setIsAuthenticated(true)
      } // todo: no token handling
    }
  }
}
