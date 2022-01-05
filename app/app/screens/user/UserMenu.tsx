import React, { FC } from "react"

import { useNavigation } from "@react-navigation/native"
import { Button } from "native-base"

import { Screen } from "components"
import { useStore } from "mobx/utils"
import { removeSecureValue } from "utils/keychain"
import { inject } from "utils/misc"

const Option = inject(Button, {
  variant: "ghost",
  justifyContent: "flex-start",
})

export const UserMenuScreen: FC = () => {
  const { navigate } = useNavigation()
  const { userStore } = useStore()

  return (
    <Screen>
      {/* <Option>View Your Profile</Option> */}
      {/* <Option>Edit Profile</Option> */}
      <Option onPress={() => navigate("user", { screen: "discordIntegration" })}>
        Discord Integration
      </Option>
      {/* <Option>Settings</Option> */}
      {/* <Option>Support the app</Option> */}
      <Option
        onPress={async () => {
          await removeSecureValue("accessToken")
          await removeSecureValue("refreshToken")
          await userStore.setAuthenticated(false)
          await removeSecureValue("accessToken")
          await removeSecureValue("refreshToken")
          await userStore.setStaffAuthenticated(false)
        }}
      >
        Logout
      </Option>
    </Screen>
  )
}
