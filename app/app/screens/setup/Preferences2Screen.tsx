import React, { FC } from "react"

import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FormProvider, useForm } from "react-hook-form"
import { useMutation } from "react-query"

import { useApi } from "api/apiProvider"
import { RadioGroupField } from "components"
import { CheckboxGroupField } from "components/fields/CheckboxGroupField"
import { SetupParams } from "navigators/app-navigator"
import { SetupScreen } from "screens/setup/SetupScreen"
import { enums } from "utils/enums"
import { storage } from "utils/misc"

const name = "preferences2"

type Props = NativeStackScreenProps<SetupParams, "preferences2">

export const Preferences2Screen: FC<Props> = ({ navigation: { navigate } }) => {
  const form = useForm({ defaultValues: storage.getObj(name)?.values })
  const api = useApi()
  const createProfile = useMutation(api.profiles.createProfile)

  const handleSubmit = (preferences2) => {
    createProfile.mutate({
      ...storage.getObj("profile1").values,
      ...storage.getObj("profile2").values,
      preferences: { ...storage.getObj("preferences1").values, ...preferences2 },
    })
  }

  return (
    <FormProvider {...form}>
      <SetupScreen
        name={name}
        heading="Preferences"
        handlePrev={() => navigate("setup", { screen: "preferences1" })}
        routeKey="4"
        handleNext={form.handleSubmit(handleSubmit)}
      >
        <CheckboxGroupField
          name="setup"
          label="Preferred Setups"
          items={Object.values(enums.setup)}
          rules={{ required: "Select your setup preference" }}
        />
        <CheckboxGroupField
          name="role"
          label="Preferred Roles"
          items={Object.values(enums.role)}
          rules={{ required: "Select your role preference" }}
        />
        <RadioGroupField
          name="mute"
          label="Mutes Preference"
          items={Object.values(enums.mute)}
          defaultValue={enums.mute.any.key}
        />
        <RadioGroupField
          name="furry"
          label="Furries Preference"
          items={Object.values(enums.furry)}
          defaultValue={
            storage.getObj("profile1").furry ? enums.furry.any.key : enums.furry.false.key
          }
        />
      </SetupScreen>
    </FormProvider>
  )
}
