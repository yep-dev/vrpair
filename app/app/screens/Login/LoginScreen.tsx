import React, { FC, useRef, useState } from "react"

import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { AlertDialog, Box, Button, Center, Checkbox, Column, Flex, Row, Text } from "native-base"

import { Screen } from "components"
import { CircleHeartIcon } from "components/icons"
import { AppParams } from "navigators/app-navigator"
import { colors } from "theme/colors"
import { useDiscordLogin } from "utils/auth"

const requirements = [
  {
    title: "I'm 18 or older",
    description:
      "Only people aged 18 and over are welcome in this VR dating community. " +
      "This is enforced across multiple similar communities and violations will be noticed and reported.",
  },
  {
    title: "I play VRChat",
    description:
      "VRChat is the most popular social VR app and is required to be able to " +
      "meet your pairs and not waste other users time here.",
  },
  {
    title: "I have a VR headset",
    description:
      "Using a VR headset is the best way to have a date online. " +
      "Users here expect you to have it to have a good experience.",
  },
]

export const LoginScreen: FC<StackScreenProps<AppParams, "login">> = observer(() => {
  const [groupValues, setGroupValues] = useState<string[]>([])
  const [showAlert, setShowAlert] = useState(false)
  const discordLogin = useDiscordLogin()
  const okRef = useRef(null)

  const handleLogin = async () => {
    if (groupValues.length === requirements.length) {
      await discordLogin()
    } else {
      setShowAlert(true)
    }
  }

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
              {requirements.map(({ title }, i) => (
                <Checkbox key={i} value={i.toString()}>
                  {title}
                </Checkbox>
              ))}
            </Column>
          </Checkbox.Group>
          <Button size="lg" variant="outline" onPress={handleLogin}>
            Log In with Discord
          </Button>
          <Text>You will be added to our discord server to be able to message your pairs.</Text>
        </Column>
      </Flex>
      <AlertDialog size="xl" isOpen={showAlert} leastDestructiveRef={okRef}>
        <AlertDialog.Content>
          <AlertDialog.Header>Confirm all requirements</AlertDialog.Header>
          <Box m={3}>
            {requirements
              .filter((_, i) => !groupValues.includes(i.toString()))
              .map(({ title, description }, i) => (
                <Box key={i} mb={4}>
                  <Text fontSize="lg" bold mb={1}>
                    {title}
                  </Text>
                  <Text>{description}</Text>
                </Box>
              ))}
            <Text bold>
              If you don't meet all of those requirements and still login, you will have your
              account banned.
            </Text>
          </Box>
          <AlertDialog.Footer>
            <Button ref={okRef} onPress={() => setShowAlert(false)}>
              OK
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Screen>
  )
})
