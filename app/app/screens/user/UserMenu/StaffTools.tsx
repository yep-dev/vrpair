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
    <Column m={3} space={2}>
      <Text>Current User ID: {user.data?.id}</Text>
      <Input
        mb={3}
        placeholder="User ID"
        rightElement={
          <Button onPress={() => forceToken.mutate({ userId: parseInt(userId) })}>Switch</Button>
        }
        value={userId}
        w="50%"
        onChangeText={setUserId}
      />
      <Text>Current Profile ID: {profile.data?.id}</Text>
      <Input
        placeholder="Profile ID"
        rightElement={
          <Button onPress={() => forceToken.mutate({ profileId: parseInt(profileId) })}>
            Switch
          </Button>
        }
        value={profileId}
        w="50%"
        onChangeText={setProfileId}
      />
    </Column>
  )
}
