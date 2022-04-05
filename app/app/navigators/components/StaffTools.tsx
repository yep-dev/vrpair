import React, { FC, useState } from "react"

import { Button, Column, Input, Modal, Text } from "native-base"

import { useCurrentProfile } from "api/profiles"
import { useCurrentUser } from "api/users"
import { useForceToken } from "utils/auth"

export const StaffTools: FC = () => {
  const [userId, setUserId] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [profileId, setProfileId] = useState("")
  const user = useCurrentUser()
  const profile = useCurrentProfile()
  const forceToken = useForceToken()

  return (
    <>
      <Button
        position="absolute"
        right={-4}
        top="30%"
        variant="outline"
        onPress={() => setShowModal(true)}
      >
        X
      </Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.Body>
            <Column display="flex" space={2}>
              <Text>Current User ID: {user.data?.id}</Text>
              <Input
                placeholder="User ID"
                rightElement={
                  <Button onPress={() => forceToken.mutate({ userId: parseInt(userId) })}>
                    Switch
                  </Button>
                }
                value={userId}
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
                onChangeText={setProfileId}
              />
            </Column>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}
