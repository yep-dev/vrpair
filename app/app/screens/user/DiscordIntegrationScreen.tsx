import React, { FC } from "react"

import { Text } from "native-base"
import { useQuery } from "react-query"

import { useApi } from "api/apiProvider"
import { usersKeys } from "api/users"
import { Screen } from "components"

export const DiscordIntegrationScreen: FC = () => {
  const api = useApi()
  const { data } = useQuery(usersKeys.currentUser, api.users.currentUser)

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
