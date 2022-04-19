import React, { FC } from "react"

import { Button, Column } from "native-base"
import { FormProvider, useForm } from "react-hook-form"
import { useQueryClient } from "react-query"

import { CurrentProfile, Profile } from "api/index.schemas"
import { getCurrentProfileQueryKey, useCurrentProfile, useEditPreferences } from "api/profiles"
import {
  Screen,
  Preferences1Fields,
  Preferences2Fields,
  preferences1Fields,
  preferences2Fields,
} from "components"
import { pick, Writeable } from "utils/general"

export const EditPreferencesScreen: FC = () => {
  const form = useForm<
    Pick<CurrentProfile["preferences"], typeof preferences1Fields[number]> &
      Pick<CurrentProfile["preferences"], typeof preferences2Fields[number]>
  >()
  const queryClient = useQueryClient()

  useCurrentProfile({
    query: {
      onSuccess: (data) => {
        form.reset({
          ...pick(data.preferences, preferences1Fields as Writeable<typeof preferences1Fields>),
          ...pick(data.preferences, preferences2Fields as Writeable<typeof preferences2Fields>),
        })
      },
    },
  })

  const { mutate } = useEditPreferences({
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
        heading="Edit Preferences"
        scroll
      >
        <Column space={6}>
          <Preferences1Fields />
          <Preferences2Fields />
          <Button flex={1} mt={4} size="lg" onPress={form.handleSubmit((data) => mutate({ data }))}>
            Save
          </Button>
        </Column>
      </Screen>
    </FormProvider>
  )
}
