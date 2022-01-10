import { useNavigation } from "@react-navigation/native"
import { useMutation, useQueryClient } from "react-query"

import { useApi } from "api/apiProvider"
import { setSecureValue } from "utils/keychain"

export const useForceToken = () => {
  const api = useApi()
  const queryClient = useQueryClient()
  const { navigate } = useNavigation()

  return useMutation(api.users.forceToken, {
    onSuccess: async ({ access, refresh }) => {
      await setSecureValue("accessToken", access)
      await setSecureValue("refreshToken", refresh)
      await queryClient.resetQueries()
      navigate("profilesCarousel")
    },
  })
}
