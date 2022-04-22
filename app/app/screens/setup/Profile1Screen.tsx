import React, { FC, useState } from "react"

import { NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { differenceInYears } from "date-fns"
import { Column, Input, Row, Text, View } from "native-base"
import { Controller, FormProvider, useForm } from "react-hook-form"

import { CurrentProfile } from "api/index.schemas"
import {
  Profile1Fields,
  ConfirmDialog,
  InputField,
  FieldLabel,
  FieldError,
  Profile1Form,
} from "components"
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
  const form = useForm<
    Profile1Form & Pick<CurrentProfile, "birthMonth" | "birthYear" | "username">
  >({ defaultValues: storage.getObj(name)?.values })
  const logout = useLogout()

  const { errors } = form.formState

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
        <Column space={6}>
          <InputField defaultValue="asd" label="Username" name="username" />
          <View>
            <FieldLabel label="Birth Date" />
            <Row alignItems="center" space={2}>
              <Controller
                control={form.control}
                name="birthMonth"
                render={({ field }) => (
                  <Input
                    keyboardType="number-pad"
                    maxLength={2}
                    placeholder="M"
                    size="lg"
                    value={field.value ? field.value.toString() : ""}
                    w="38px"
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                  />
                )}
                rules={{
                  required: "Birth month is required",
                  pattern: {
                    value: /^(0?[1-9]|1[0-2])$/,
                    message: "Birth month must be between 1 and 12",
                  },
                }}
              />
              <Text fontSize="2xl">/</Text>
              <Controller
                control={form.control}
                name="birthYear"
                render={({ field }) => (
                  <Input
                    keyboardType="number-pad"
                    maxLength={4}
                    placeholder="YYYY"
                    size="lg"
                    value={field.value ? field.value.toString() : ""}
                    w="58px"
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                  />
                )}
                rules={{
                  required: "Birth year is required",
                  min: {
                    value: 1920,
                    message: "Birth year must be after 1920",
                  },
                  validate: (year) => {
                    const date = new Date(year, form.getValues("birthMonth"), 1)
                    return differenceInYears(new Date(), date) >= 18 || "You must be 18 or older"
                  },
                }}
              />
            </Row>
            <FieldError error={errors.birthYear} />
            <FieldError error={errors.birthMonth} />
          </View>
          <Profile1Fields />
        </Column>
        <ConfirmDialog action={logout} isOpen={logoutDialogOpen} setOpen={setLogoutDialogOpen}>
          This will remove the form data and log you out
        </ConfirmDialog>
      </SetupScreen>
    </FormProvider>
  )
}
