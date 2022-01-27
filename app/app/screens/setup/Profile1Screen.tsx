import React, { FC, useRef, useState } from "react"

import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AlertDialog, Button, Input, Row, Text, View } from "native-base"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { useQuery } from "react-query"

import { useApi } from "api/apiProvider"
import { FieldError, FieldLabel, InputField, RadioGroupField } from "components"
import { CheckboxField } from "components/fields/CheckboxField"
import { SetupParams } from "navigators/app-navigator"
import { SetupScreen } from "screens/setup/SetupScreen"
import { useLogout } from "utils/auth"
import { enums } from "utils/enums"
import { storage } from "utils/misc"

const { gender, femAvatar } = enums
const name = "profile1"

type Props = NativeStackScreenProps<SetupParams, "profile1">

export const Profile1Screen: FC<Props> = ({ navigation: { navigate } }) => {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const cancelRef = useRef(null)

  const logout = useLogout()
  const api = useApi()
  const { data: discordUsername } = useQuery("currentUser", api.users.currentUser, {
    select: (user) => user.discordUsername,
  })

  const form = useForm({ defaultValues: storage.getObj(name)?.values })
  const { errors } = form.formState

  return (
    <FormProvider {...form}>
      <SetupScreen
        name={name}
        heading="Profile"
        handlePrev={() => {
          setLogoutDialogOpen(true)
        }}
        routeKey="1"
        handleNext={form.handleSubmit(() => navigate("setup", { screen: "profile2" }))}
      >
        <InputField name="username" label="Username" defaultValue={discordUsername} />
        <View>
          <FieldLabel label="Birth date" />
          <Row space={2} alignItems="center">
            <Controller
              control={form.control}
              rules={{
                required: "Birth month is required",
              }}
              render={({ field }) => (
                <Input
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  w="38px"
                  size="lg"
                  placeholder="M"
                  keyboardType="number-pad"
                />
              )}
              name="birth.month"
            />
            <Text fontSize="2xl">/</Text>
            <Controller
              control={form.control}
              rules={{
                required: "Birth year is required",
              }}
              render={({ field }) => (
                <Input
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  w="58px"
                  size="lg"
                  placeholder="YYYY"
                />
              )}
              name="birth.year"
            />
          </Row>
          <FieldError error={errors.birth?.month} />
          <FieldError error={errors.birth?.year} />
        </View>
        <View>
          <RadioGroupField
            name="gender"
            label="Gender"
            rules={{ required: "Select your gender" }}
            items={[gender.male, gender.female, gender.nonBinary]}
          />
          <CheckboxField name="trans" size="sm" mt={2}>
            Transgender
          </CheckboxField>
        </View>
        <View>
          <RadioGroupField
            name="femAvatar"
            label="Avatar type"
            rules={{ required: "Select your avatar type" }}
            items={[femAvatar.true, femAvatar.false]}
          />
          <Row justifyContent="space-evenly" mt={1}>
            <Text>Includes femboy</Text>
            <Text>Includes tomboy</Text>
          </Row>
        </View>
        <AlertDialog
          isOpen={logoutDialogOpen}
          onClose={() => setLogoutDialogOpen(false)}
          leastDestructiveRef={cancelRef}
          closeOnOverlayClick
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Logout</AlertDialog.Header>
            <AlertDialog.Body>This will remove all form data and log you out</AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={() => setLogoutDialogOpen(false)}
                  ref={cancelRef}
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
