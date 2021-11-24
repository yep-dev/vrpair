import { useStore } from "mobx/utils"
import { RootParams } from "navigators/app-navigator"
import { setSecureValue } from "utils/keychain"
import colors from "theme/colors"
import { CircleHeartIcon } from "icons"
import { Box, Button, Center, Checkbox, Flex, HStack, Text, VStack } from "native-base"
import React, { FC } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen } from "components"
import { authorize } from "react-native-app-auth"
import { OAUTH_DISCORD_CLIENT_ID, API_URL } from "config/env"

export const LoginScreen: FC<StackScreenProps<RootParams, "login">> = observer(() => {
  const { userStore } = useStore()

  const config = {
    serviceConfiguration: {
      authorizationEndpoint: "https://discord.com/api/oauth2/authorize",
      tokenEndpoint: "https://discord.com/api/oauth2/token",
      revocationEndpoint: "https://discord.com/api/oauth2/token/revoke",
    },
    clientId: OAUTH_DISCORD_CLIENT_ID,
    redirectUrl: `${API_URL}/discord`,
    scopes: ["identify", "email"],
    usePKCE: false,
    useNonce: false,
    skipCodeExchange: true,
  }

  const auth = async () => {
    try {
      await authorize(config)
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

  const [groupValues, setGroupValues] = React.useState([])
  return (
    <Screen m={10}>
      <Flex justifyContent="space-around" style={{ flex: 1 }}>
        <Center>
          <HStack alignItems="center" justifyContent="center">
            <Box mr={2} mt={0.5}>
              <CircleHeartIcon color={colors.pink["400"]} />
            </Box>
            <Text fontSize="6xl" fontWeight="light">
              vrpair
            </Text>
          </HStack>
          <Text mt={2} fontSize="md" color={colors.gray["200"]}>
            Dating app for VR players
          </Text>
        </Center>
        <Box>
          <Checkbox.Group onChange={setGroupValues} value={groupValues} mb={8}>
            <VStack space={4}>
              <Checkbox value="1">I'm 18 or older</Checkbox>
              <Checkbox value="2">I play VRChat</Checkbox>
              <Checkbox value="3">I have a VR headset connected to the PC</Checkbox>
            </VStack>
          </Checkbox.Group>
          <Button size="lg" variant="outline" onPress={auth}>
            Log In with Discord
          </Button>
        </Box>
      </Flex>
    </Screen>
  )
})
