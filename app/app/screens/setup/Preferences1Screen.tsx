import React, { FC } from "react"

import { NavigatorScreenParams } from "@react-navigation/native"
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
        routeKey="3"
      >
        <GenderCheckboxField />
        <RadioGroupField
          items={Object.values(enums.femAvatar)}
          label="Preferred Avatar Type"
          name="femAvatar"
          rules={{ required: "Select preferred avatar type" }}
        />
        <AgeRangeField />
      </SetupScreen>
    </FormProvider>
  )
}
