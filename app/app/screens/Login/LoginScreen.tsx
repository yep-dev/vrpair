import colors from "../../theme/colors"
import { CircleHeartIcon } from "../../icons"
import { Button, Flex, Text } from "native-base"
import React, { FC } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { authorize } from "react-native-app-auth"
import { OAUTH_DISCORD_CLIENT_ID } from "../../config/env"

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login">> = observer(() => {
  const config = {
    serviceConfiguration: {
      authorizationEndpoint: "https://discord.com/api/oauth2/authorize",
      tokenEndpoint: "https://discord.com/api/oauth2/token",
      revocationEndpoint: "https://discord.com/api/oauth2/token/revoke",
    },
    clientId: OAUTH_DISCORD_CLIENT_ID,
    redirectUrl: "http://127.0.0.1:8000/discord",
    scopes: ["identify"],
    usePKCE: false,
  }

  const auth = async () => {
    try {
      const result = await authorize(config)
      // result includes accessToken, accessTokenExpirationDate and refreshToken
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Screen m={20}>
      <Flex justifyContent="space-around" style={{ flex: 1 }}>
        <Flex direction="row" alignItems="center" justifyContent="center">
          <CircleHeartIcon color={colors.pink["500"]} />
          <Text fontSize="5xl" fontWeight="light">
            vrpair
          </Text>
        </Flex>
        <Button variant="outline" colorScheme="pink" onPress={auth}>
          Log In with Discord
        </Button>
      </Flex>
    </Screen>
  )
})
