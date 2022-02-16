import React, { FC } from "react"

import { observer } from "mobx-react-lite"
import { Text } from "native-base"

import { useCurrentUser } from "api/users"
import { Screen } from "components"
import { useStore } from "mobx/utils"

export const DiscordIntegrationScreen: FC = observer(() => {
  const { userStore } = useStore()
  const { data } = useCurrentUser()

  return (
    <Screen>
      {data && (
        <>
          <Text>
            {data.discordUsername}#{data.discordDiscriminator}
          </Text>
          {userStore.staffAuthenticated && <Text>ID: {data.id}</Text>}
        </>
      )}
    </Screen>
  )
})
