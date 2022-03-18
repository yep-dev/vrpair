import React, { FC } from "react"

import { NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FormProvider, useForm } from "react-hook-form"
import { useQueryClient } from "react-query"

import { Profile, User } from "api/index.schemas"
import { getCurrentProfileQueryKey, useCreateProfile } from "api/profiles"
import { getCurrentUserQueryKey } from "api/users"
import { Preferences2Fields } from "components/profileFields/Preferences2Fields"
import { SetupParams } from "navigators/app-navigator"
import { SetupScreen } from "screens/setup/SetupScreen"
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
        <Preferences2Fields />
      </SetupScreen>
    </FormProvider>
  )
}
