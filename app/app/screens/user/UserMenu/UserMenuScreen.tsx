import React, { FC, useState } from "react"

import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button } from "native-base"

import { Screen } from "components"
import { ConfirmDialog } from "components/ConfirmDialog"
import { TabNavigationProps } from "navigators/app-navigator"
import { useLogout } from "utils/auth"
import { inject } from "utils/misc"

const Option = inject(Button, {
  variant: "ghost",
  justifyContent: "flex-start",
})

export const UserMenuScreen: FC = observer(() => {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const { navigate } = useNavigation<TabNavigationProps>()
  const logout = useLogout()

  return (
    <Screen>
      {/* <Option>View Your Profile</Option> */}
      {/* <Option>Edit Profile</Option> */}
      <Option onPress={() => navigate("user", { screen: "discordIntegration" })}>
        Discord Integration
      </Option>
      {/* <Option>Settings</Option> */}
      {/* <Option>Support the app</Option> */}
      <Option>Edit profile</Option>
      <Option onPress={() => setLogoutDialogOpen(true)}>Logout</Option>
      <ConfirmDialog action={logout} isOpen={logoutDialogOpen} setOpen={setLogoutDialogOpen}>
        Are you sure you want to log out?
      </ConfirmDialog>
    </Screen>
  )
})
