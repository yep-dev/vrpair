import React, { FC, useState } from "react"

import { NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FormProvider, useForm } from "react-hook-form"

import { ConfirmDialog } from "components/ConfirmDialog"
import { Profile1Fields } from "components/profileFields/Profile1Fields"
import { SetupParams } from "navigators/app-navigator"
import { SetupScreen } from "screens/setup/SetupScreen"
import { useLogout } from "utils/auth"
import { storage } from "utils/misc"

const name = "profile1"

type ParamList = {
  setup: NavigatorScreenParams<SetupParams>
}
export type Props = NativeStackScreenProps<ParamList>

export const Profile1Screen: FC<Props> = ({ navigation: { navigate } }) => {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const form = useForm({ defaultValues: storage.getObj(name)?.values })
  const logout = useLogout()

  return (
    <FormProvider {...form}>
      <SetupScreen
        handleNext={form.handleSubmit(() => navigate("setup", { screen: "profile2" }))}
        handlePrev={() => {
          setLogoutDialogOpen(true)
        }}
        heading="Profile"
        name={name}
      >
        <Profile1Fields form={form} />
        <ConfirmDialog action={logout} isOpen={logoutDialogOpen} setOpen={setLogoutDialogOpen}>
          This will remove the form data and log you out
        </ConfirmDialog>
      </SetupScreen>
    </FormProvider>
  )
}
