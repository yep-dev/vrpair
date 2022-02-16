import React, { FC } from "react"

import { Text } from "native-base"

import { useCurrentUser } from "api/users"
import { Screen } from "components"

export const DiscordIntegrationScreen: FC = () => {
  const { data } = useCurrentUser()

  return (
    <Screen>
      {data && (
        <>
          <Text>
            {data.discordUsername}#{data.discordDiscriminator}
          </Text>
        </>
      )}
    </Screen>
  )
}
