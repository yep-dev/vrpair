import React, { FC } from "react"

import { Text } from "native-base"
import { useQuery } from "react-query"

import { useApi } from "api/apiProvider"
import { Screen } from "components"
import { useStore } from "mobx/utils"

export const DiscordIntegrationScreen: FC = () => {
  const { userStore } = useStore()
  const api = useApi()
  const { data } = useQuery("currentUser", api.users.currentUser)

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
}
