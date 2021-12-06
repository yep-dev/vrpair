import { TProfile } from "api/profiles"
import Preferences from "components/Profile/Preferences"
import { Badge, Flex, HStack, Image, Text, VStack } from "native-base"
import React, { FC } from "react"
import styled from "styled-components"
import { enums } from "utils/enums"

const Row = styled(HStack)`
  flex-wrap: wrap;
`

export const Tag = styled(Badge)`
  margin-bottom: 8px;
  align-self: flex-start;
`

export const Profile: FC<{ profile: TProfile }> = ({ profile }) => {
  const { preferences } = profile

  return (
    <Flex m={8}>
      <Image
        source={{ uri: "https://images.dog.ceo/breeds/pitbull/20190801_154956.jpg" }}
        alt="user photo"
        borderRadius={8}
        style={{ height: 200 }} // todo: constant aspect ratio
        mb={8}
      />
      <VStack mb={4}>
        <Text fontSize="2xl" mb={2}>
          {profile.username}, {profile.age}
        </Text>
        <Row space={2}>
          <Tag colorScheme={enums.gender[profile.gender.replace("Cis", "")].color}>
            {enums.gender[profile.gender.replace("Cis", "")].label}
          </Tag>
          <Tag colorScheme={enums.femAvatar[profile.femAvatar.toString()].color}>
            {enums.femAvatar[profile.femAvatar.toString()].label}
          </Tag>
        </Row>
        <Row space={2}>
          <Tag colorScheme={enums.role[profile.role].color}>{enums.role[profile.role].label}</Tag>
          <Tag colorScheme="gray">{enums.setup[profile.setup].label}</Tag>
          {profile.mute && <Tag colorScheme="gray">Mute</Tag>}
          {profile.furry && <Tag colorScheme="gray">Furry</Tag>}
        </Row>
      </VStack>
      {preferences && <Preferences preferences={profile.preferences} />}
    </Flex>
  )
}
