import React, { FC, useRef, useState } from "react"

import { NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AlertDialog, Button, Input, Row, Text, View } from "native-base"
import { Controller, FormProvider, useForm } from "react-hook-form"

import { useCurrentUser } from "api/users"
import { FieldError, FieldLabel, InputField, RadioGroupField } from "components"
import { CheckboxField } from "components/fields/CheckboxField"
import { SetupParams } from "navigators/app-navigator"
import { SetupScreen } from "screens/setup/SetupScreen"
import { useLogout } from "utils/auth"
import { enums } from "utils/enums"
import { storage } from "utils/misc"

const { gender, femAvatar } = enums
const name = "profile1"

type ParamList = {
  setup: NavigatorScreenParams<SetupParams>
}
export type Props = NativeStackScreenProps<ParamList>

export const Profile1Screen: FC<Props> = ({ navigation: { navigate } }) => {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const cancelRef = useRef(null)

  const logout = useLogout()
  const { data: discordUsername } = useCurrentUser({
    query: {
      select: (user) => user.discordUsername,
    },
  })

  const form = useForm({ defaultValues: storage.getObj(name)?.values })
  const { errors } = form.formState

  return (
    <FormProvider {...form}>
      <SetupScreen
        handleNext={form.handleSubmit(() => navigate("setup", { screen: "profile2" }))}
        handlePrev={() => {
          setLogoutDialogOpen(true)
        }}
        heading="Profile"
        name={name}
        routeKey="1"
      >
        <InputField defaultValue={discordUsername} label="Username" name="username" />
        <View>
          <FieldLabel label="Birth Date" />
          <Row alignItems="center" space={2}>
            <Controller
              control={form.control}
              name="birthMonth"
              render={({ field }) => (
                <Input
                  keyboardType="number-pad"
                  placeholder="M"
                  size="lg"
                  value={field.value}
                  w="38px"
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                />
              )}
              rules={{
                required: "Birth month is required",
              }}
            />
            <Text fontSize="2xl">/</Text>
            <Controller
              control={form.control}
              name="birthYear"
              render={({ field }) => (
                <Input
                  placeholder="YYYY"
                  size="lg"
                  value={field.value}
                  w="58px"
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                />
              )}
              rules={{
                required: "Birth year is required",
              }}
            />
          </Row>
          <FieldError error={errors.birthYear} />
          <FieldError error={errors.birthMonth} />
        </View>
        <View>
          <RadioGroupField
            items={[gender.male, gender.female, gender.nonBinary]}
            label="Gender"
            name="gender"
            rules={{ required: "Select your gender" }}
          />
          <CheckboxField mt={2} name="trans" size="sm">
            Transgender
          </CheckboxField>
        </View>
        <View>
          <RadioGroupField
            items={[femAvatar.true, femAvatar.false]}
            label="Avatar Type"
            name="femAvatar"
            rules={{ required: "Select your avatar type" }}
          />
          <Row justifyContent="space-evenly" mt={1}>
            <Text>Includes femboy</Text>
            <Text>Includes tomboy</Text>
          </Row>
        </View>
        <AlertDialog
          closeOnOverlayClick
          isOpen={logoutDialogOpen}
          leastDestructiveRef={cancelRef}
          onClose={() => setLogoutDialogOpen(false)}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Logout</AlertDialog.Header>
            <AlertDialog.Body>This will remove all form data and log you out</AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  ref={cancelRef}
                  colorScheme="coolGray"
                  variant="unstyled"
                  onPress={() => setLogoutDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button colorScheme="danger" onPress={() => logout()}>
                  Logout
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </SetupScreen>
    </FormProvider>
  )
}
