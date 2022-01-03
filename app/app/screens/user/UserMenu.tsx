import React, { FC } from "react"

import { Button } from "native-base"

import { Screen } from "components"
import { removeSecureValue } from "utils/keychain"

export const UserMenuScreen: FC = () => {
  return (
    <Screen>
      <Button
        onPress={async () => {
          await removeSecureValue("accessToken")
          await removeSecureValue("refreshToken")
        }}
      >
        Logout
      </Button>
    </Screen>
  )
}
