import colors from "../../theme/colors"
import { CircleHeartIcon } from "../../icons"
import { Button, Center, Flex, Text } from "native-base"
import React, { FC } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"
import { authorize } from "react-native-app-auth"

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(() => {
  const config = {
    serviceConfiguration: {
      authorizationEndpoint: "https://discord.com/api/oauth2/authorize",
      tokenEndpoint: "https://discord.com/api/oauth2/token",
      revocationEndpoint: "https://discord.com/api/oauth2/token/revoke",
    },
    clientId: "893178973016702976",
    redirectUrl: "http://127.0.0.1:8000/accounts/discord/login/callback/",
    scopes: ["identify"],
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
    <Screen>
      <Center>
        <Flex direction="row" alignItems="center">
          <CircleHeartIcon color={colors.pink["500"]} />
          <Text fontSize="5xl" fontWeight="light">
            vrpair
          </Text>
        </Flex>
      </Center>
      <Button variant="outline" colorScheme="pink" onPress={auth}>
        Continue
      </Button>
    </Screen>
  )
})
