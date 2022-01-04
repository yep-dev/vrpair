import React, { FC } from "react"

import { useNavigation } from "@react-navigation/native"
import { Button } from "native-base"

import { Screen } from "components"
import { removeSecureValue } from "utils/keychain"
import { inject } from "utils/misc"

const Option = inject(Button, {
  variant: "ghost",
  justifyContent: "flex-start",
})

export const UserMenuScreen: FC = () => {
  const { navigate } = useNavigation()

  return (
    <Screen>
      {/* <Option>View Your Profile</Option> */}
      {/* <Option>Edit Profile</Option> */}
      <Option onPress={() => navigate("discordIntegration")}>Discord Integration</Option>
      {/* <Option>Settings</Option> */}
      {/* <Option>Support the app</Option> */}
      <Option
        onPress={async () => {
          await removeSecureValue("accessToken")
          await removeSecureValue("refreshToken")
        }}
      >
        Logout
      </Option>
    </Screen>
  )
}
