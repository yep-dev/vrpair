import React, { FC } from "react"

import { Button, Column } from "native-base"
import { FormProvider, useForm } from "react-hook-form"

import { Screen, Preferences1Fields, Preferences2Fields } from "components"

export const EditPreferencesScreen: FC = () => {
  const form = useForm({ defaultValues: {} })

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
          <Button flex={1} size="lg" onPress={form.handleSubmit()}>
            Save
          </Button>
        </Column>
      </Screen>
    </FormProvider>
  )
}
