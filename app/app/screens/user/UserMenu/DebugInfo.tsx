import React, { FC } from "react"

import { Box, Text } from "native-base"
import { useQuery } from "react-query"

import { useApi } from "api/apiProvider"

export const DebugInfo: FC = () => {
  const api = useApi()
  const user = useQuery("currentUser", api.users.currentUser)
  const profile = useQuery("currentProfile", api.profiles.currentProfile)

  return (
    <Box m={3}>
      <Text>User ID: {user.data?.id}</Text>
      <Text>Profile ID: {profile.data?.id}</Text>
    </Box>
  )
}
