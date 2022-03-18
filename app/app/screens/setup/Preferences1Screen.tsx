import React, { FC } from "react"

import { NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FormProvider, useForm } from "react-hook-form"

import { Preferences1Fields } from "components/profileFields/Preferences1Fields"
import { SetupParams } from "navigators/app-navigator"
import { SetupScreen } from "screens/setup/SetupScreen"
import { storage } from "utils/misc"

const name = "preferences1"

type ParamList = {
  setup: NavigatorScreenParams<SetupParams>
}
export type Props = NativeStackScreenProps<ParamList>

export const Preferences1Screen: FC<Props> = ({ navigation: { navigate } }) => {
  const form = useForm({ defaultValues: storage.getObj(name)?.values })

  return (
    <FormProvider {...form}>
      <SetupScreen
        handleNext={form.handleSubmit(() => navigate("setup", { screen: "preferences2" }))}
        handlePrev={() => navigate("setup", { screen: "profile2" })}
        heading="Preferences"
        name={name}
      >
        <Preferences1Fields />
      </SetupScreen>
    </FormProvider>
  )
}
