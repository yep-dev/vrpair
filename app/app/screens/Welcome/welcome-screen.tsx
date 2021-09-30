import colors from "../../theme/colors"
import { CircleHeartIcon } from "../../icons"
import { Button, Center, Flex, Text } from "native-base"
import React, { FC } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { NavigatorParamList } from "../../navigators"
import { Screen } from "../../components"

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(() => {
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
      <Button variant="outline" colorScheme="pink" onPress={() => console.log("asd")}>
        Continue
      </Button>
    </Screen>
  )
})
