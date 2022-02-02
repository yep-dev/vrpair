import React, { FC } from "react"

import { observer } from "mobx-react-lite"
import { Text } from "native-base"
import { useQuery } from "react-query"

import { useApi } from "api/apiProvider"
import { usersKeys } from "api/users"
import { Screen } from "components"
import { useStore } from "mobx/utils"

export const DiscordIntegrationScreen: FC = observer(() => {
  const { userStore } = useStore()
  const api = useApi()
  const { data } = useQuery(usersKeys.currentUser, api.users.currentUser)

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
