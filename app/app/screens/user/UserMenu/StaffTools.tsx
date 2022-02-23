import React, { FC, useState } from "react"

import { Button, Column, Input, Text } from "native-base"

import { useCurrentProfile } from "api/profiles"
import { useCurrentUser } from "api/users"
import { useForceToken } from "utils/auth"

export const StaffTools: FC = () => {
  const [userId, setUserId] = useState("")
  const [profileId, setProfileId] = useState("")
  const user = useCurrentUser()
  const profile = useCurrentProfile()
  const forceToken = useForceToken()

  return (
    <Column space={2} m={3}>
      <Text>Current User ID: {user.data?.id}</Text>
      <Input
        mb={3}
        placeholder="User ID"
        w="50%"
        value={userId}
        onChangeText={setUserId}
        rightElement={
          <Button onPress={() => forceToken.mutate({ userId: parseInt(userId) })}>Switch</Button>
        }
      />
      <Text>Current Profile ID: {profile.data?.id}</Text>
      <Input
        placeholder="Profile ID"
        w="50%"
        value={profileId}
        onChangeText={setProfileId}
        rightElement={
          <Button onPress={() => forceToken.mutate({ profileId: parseInt(profileId) })}>
            Switch
          </Button>
        }
      />
    </Column>
  )
}
