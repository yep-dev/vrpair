import React, { FC } from "react"

import { Button, Column } from "native-base"
import { FormProvider, useForm } from "react-hook-form"
import { useQueryClient } from "react-query"

import { CurrentProfile, Profile } from "api/index.schemas"
import { getCurrentProfileQueryKey, useCurrentProfile, useEditProfile } from "api/profiles"
import { Screen, Profile1Fields, Profile2Fields, profile1Fields, profile2Fields } from "components"
import { pick } from "utils/general"

export const EditProfileScreen: FC = () => {
  const form = useForm<CurrentProfile>()
  const queryClient = useQueryClient()

  useCurrentProfile({
    query: {
      onSuccess: (data) => {
        form.reset({
          ...pick(data, profile1Fields),
          ...pick(data, profile2Fields),
          femAvatar: data.femAvatar.toString(),
        })
      },
    },
  })

  const { mutate } = useEditProfile({
    mutation: {
      onSuccess: (data) => {
        queryClient.setQueryData<Profile>(getCurrentProfileQueryKey(), data)
      },
    },
  })

  return (
    <FormProvider {...form}>
      <Screen
        _contentContainerStyle={{
          mx: 5,
        }}
        handlePrev
        heading="Edit Profile"
        scroll
      >
        <Column space={6}>
          <Profile1Fields form={form} />
          <Profile2Fields />
          <Button flex={1} size="lg" onPress={form.handleSubmit()}>
            Save
          </Button>
        </Column>
      </Screen>
    </FormProvider>
  )
}
