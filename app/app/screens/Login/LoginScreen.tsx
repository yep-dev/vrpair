import { AppParams } from "navigators/app-navigator"
import { useDiscordLogin } from "utils/auth"
import { colors } from "theme/colors"
import { CircleHeartIcon } from "components/icons"
import { Box, Button, Center, Checkbox, Column, Flex, Row, Text } from "native-base"
import React, { FC } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen } from "components"

export const LoginScreen: FC<StackScreenProps<AppParams, "login">> = observer(() => {
  const [groupValues, setGroupValues] = React.useState([])
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
        <Box>
          <Checkbox.Group onChange={setGroupValues} value={groupValues} mb={8}>
            <Column space={4}>
              <Checkbox value="1">I'm 18 or older</Checkbox>
              <Checkbox value="2">I play VRChat</Checkbox>
              <Checkbox value="3">I have a VR headset connected to the PC</Checkbox>
            </Column>
          </Checkbox.Group>
          <Button size="lg" variant="outline" onPress={discordLogin}>
            Log In with Discord
          </Button>
        </Box>
      </Flex>
    </Screen>
  )
})
