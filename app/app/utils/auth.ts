import { authorize } from "react-native-app-auth"
import { useQueryClient, useMutation } from "react-query"

import { getCurrentUserQueryKey, useCurrentUserHook, useForceTokenHook } from "api/users"
import { API_URL, OAUTH_DISCORD_CLIENT_ID } from "config/env"
import { useStore } from "mobx/utils"
import { NAVIGATION_PERSISTENCE_KEY } from "navigators/app-navigator"
import { removeSecureValue, setSecureValue } from "utils/keychain"
import { storage } from "utils/misc"

const discordConfig = {
  serviceConfiguration: {
    authorizationEndpoint: "https://discord.com/api/oauth2/authorize",
    tokenEndpoint: "https://discord.com/api/oauth2/token",
    revocationEndpoint: "https://discord.com/api/oauth2/token/revoke",
  },
  clientId: OAUTH_DISCORD_CLIENT_ID,
  redirectUrl: `${API_URL}/users/discord-login`,
  scopes: ["identify", "email", "guilds.join"],
  usePKCE: false,
  useNonce: false,
  skipCodeExchange: true,
}

export const useDiscordLogin = () => {
  const { userStore } = useStore()
  const queryClient = useQueryClient()
  const currentUserFetch = useCurrentUserHook()

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
        await userStore.setAuthenticated(true)

        const data = await queryClient.fetchQuery(getCurrentUserQueryKey(), currentUserFetch)
        if (data.isStaff) {
          await setSecureValue("staffAccessToken", accessToken)
          await setSecureValue("staffRefreshToken", refreshToken)
          await userStore.setStaffAuthenticated(true)
        }
      } // todo: no token handling
    }
  }
}

export const useForceToken = () => {
  const queryClient = useQueryClient()
  const forceTokenFn = useForceTokenHook()

  return useMutation(forceTokenFn, {
    onMutate: async () => {
      storage.delete(NAVIGATION_PERSISTENCE_KEY)
      await queryClient.resetQueries()
    },
    onSuccess: async ({ access, refresh }) => {
      await setSecureValue("accessToken", access)
      await setSecureValue("refreshToken", refresh)
    },
  })
}

export const useLogout = () => {
  const { userStore } = useStore()

  return async ({ logoutStaff = false } = {}) => {
    storage.clearAll()
    await removeSecureValue("accessToken")
    await removeSecureValue("refreshToken")
    await userStore.setAuthenticated(false)
    if (logoutStaff) {
      await removeSecureValue("staffAccessToken")
      await removeSecureValue("staffRefreshToken")
      await userStore.setStaffAuthenticated(false)
    }
  }
}
