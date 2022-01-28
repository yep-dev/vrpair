import React, { FC } from "react"

import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FormProvider, useForm } from "react-hook-form"

import { RadioGroupField } from "components"
import { SetupParams } from "navigators/app-navigator"
import { AgeRangeField } from "screens/setup/AgeRangeField"
import { GenderCheckboxField } from "screens/setup/GenderCheckboxField"
import { SetupScreen } from "screens/setup/SetupScreen"
import { enums } from "utils/enums"
import { storage } from "utils/misc"

const name = "preferences1"

type Props = NativeStackScreenProps<SetupParams, "preferences1">

export const Preferences1Screen: FC<Props> = ({ navigation: { navigate } }) => {
  const form = useForm({ defaultValues: storage.getObj(name)?.values })

  return (
    <FormProvider {...form}>
      <SetupScreen
        name={name}
        heading="Preferences"
        handlePrev={() => navigate("setup", { screen: "profile2" })}
        routeKey="3"
        handleNext={form.handleSubmit(() => navigate("setup", { screen: "preferences2" }))}
      >
        <GenderCheckboxField />
        <RadioGroupField
          name="femAvatar"
          label="Preferred Avatar Type"
          rules={{ required: "Select preferred avatar type" }}
          items={Object.values(enums.femAvatar)}
        />
        <AgeRangeField />
      </SetupScreen>
    </FormProvider>
  )
}
