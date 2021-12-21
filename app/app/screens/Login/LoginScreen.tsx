import React, { FC, useState } from "react"

import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Box, Button, Center, Checkbox, Column, Flex, Row, Text } from "native-base"

import { Screen } from "components"
import { CircleHeartIcon } from "components/icons"
import { AppParams } from "navigators/app-navigator"
import { colors } from "theme/colors"
import { useDiscordLogin } from "utils/auth"

export const LoginScreen: FC<StackScreenProps<AppParams, "login">> = observer(() => {
  const [groupValues, setGroupValues] = useState([])
  const discordLogin = useDiscordLogin()

  return (
    <Screen m={10}>
      <Flex justifyContent="space-around" style={{ flex: 1 }}>
        <Center>
          <Row alignItems="center" justifyContent="center">
            <Box mr={2} mt={0.5}>
              <CircleHeartIcon color={colors.pink["400"]} />
            </Box>
            <Text fontSize="6xl" fontWeight="light">
              vrpair
            </Text>
          </Row>
          <Text mt={2} fontSize="md" color={colors.gray["200"]}>
            Dating app for VR players
          </Text>
        </Center>
        <Column space={8}>
          <Checkbox.Group onChange={setGroupValues} value={groupValues}>
            <Column space={4}>
              <Checkbox value="1">I'm 18 or older</Checkbox>
              <Checkbox value="2">I play VRChat</Checkbox>
              <Checkbox value="3">I have a VR headset</Checkbox>
            </Column>
          </Checkbox.Group>
          <Button size="lg" variant="outline" onPress={discordLogin}>
            Log In with Discord
          </Button>
          <Text>You will be added to our discord server to be able to message your pairs.</Text>
        </Column>
      </Flex>
    </Screen>
  )
})
