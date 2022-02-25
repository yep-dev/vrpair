import React, { FC } from "react"

import { NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FormProvider, useForm } from "react-hook-form"

import { RadioGroupField } from "components"
import { CheckboxField } from "components/fields/CheckboxField"
import { SetupParams } from "navigators/app-navigator"
import { SetupScreen } from "screens/setup/SetupScreen"
import { enums } from "utils/enums"
import { storage } from "utils/misc"

const { setup, role } = enums

const name = "profile2"

type ParamList = {
  setup: NavigatorScreenParams<SetupParams>
}
export type Props = NativeStackScreenProps<ParamList>

export const Profile2Screen: FC<Props> = ({ navigation: { navigate } }) => {
  const form = useForm({ defaultValues: storage.getObj(name)?.values })

  return (
    <FormProvider {...form}>
      <SetupScreen
        handleNext={form.handleSubmit(() => navigate("setup", { screen: "preferences1" }))}
        handlePrev={() => navigate("setup", { screen: "profile1" })}
        heading="Profile"
        name={name}
        routeKey="2"
      >
        <RadioGroupField
          items={[setup.quest, setup.pcvr, setup.fbt]}
          label="VR Setup"
          name="setup"
          rules={{ required: "Select your VR setup type" }}
        />
        <RadioGroupField
          items={[role.sub, role.dom, role.switch]}
          label="Role"
          name="role"
          rules={{ required: "Select your role" }}
        />
        <CheckboxField name="mute" size="sm">
          Mute
        </CheckboxField>
        <CheckboxField name="furry" size="sm">
          Furry
        </CheckboxField>
      </SetupScreen>
    </FormProvider>
  )
}
