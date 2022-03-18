import React, { FC } from "react"

import { NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FormProvider, useForm } from "react-hook-form"
import { useQueryClient } from "react-query"

import { Profile, User } from "api/index.schemas"
import { getCurrentProfileQueryKey, useCreateProfile } from "api/profiles"
import { getCurrentUserQueryKey } from "api/users"
import { RadioGroupField } from "components"
import { CheckboxGroupField } from "components/fields/CheckboxGroupField"
import { SetupParams } from "navigators/app-navigator"
import { SetupScreen } from "screens/setup/SetupScreen"
import { enums } from "utils/enums"
import { storage } from "utils/misc"

const name = "preferences2"

type ParamList = {
  setup: NavigatorScreenParams<SetupParams>
}
export type Props = NativeStackScreenProps<ParamList>

export const Preferences2Screen: FC<Props> = ({ navigation: { navigate } }) => {
  const form = useForm({ defaultValues: storage.getObj(name)?.values })
  const queryClient = useQueryClient()
  const createProfile = useCreateProfile({
    mutation: {
      onSuccess: (data) => {
        queryClient.setQueryData<User>(
          getCurrentUserQueryKey(),
          (user) =>
            ({
              ...user,
              hasProfile: true,
            } as User),
        )
        queryClient.setQueryData<Profile>(getCurrentProfileQueryKey(), data)
      },
    },
  })

  const handleSubmit = (preferences2) => {
    createProfile.mutate({
      data: {
        ...storage.getObj("profile1").values,
        ...storage.getObj("profile2").values,
        preferences: { ...storage.getObj("preferences1").values, ...preferences2 },
      },
    })
  }

  return (
    <FormProvider {...form}>
      <SetupScreen
        handleNext={form.handleSubmit(handleSubmit)}
        handlePrev={() => navigate("setup", { screen: "preferences1" })}
        heading="Preferences"
        name={name}
      >
        <CheckboxGroupField
          items={Object.values(enums.setup)}
          label="Preferred Setups"
          name="setup"
          rules={{ required: "Select your setup preference" }}
        />
        <CheckboxGroupField
          items={Object.values(enums.role)}
          label="Preferred Roles"
          name="role"
          rules={{ required: "Select your role preference" }}
        />
        <RadioGroupField
          defaultValue={enums.mute.any.key}
          items={Object.values(enums.mute)}
          label="Mutes Preference"
          name="mute"
        />
        <RadioGroupField
          defaultValue={
            storage.getObj("profile1").furry ? enums.furry.any.key : enums.furry.false.key
          }
          items={Object.values(enums.furry)}
          label="Furries Preference"
          name="furry"
        />
      </SetupScreen>
    </FormProvider>
  )
}
