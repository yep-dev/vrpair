import React, { FC } from "react"

import { Badge, Image, Text, Row, Column, ScrollView } from "native-base"

import { TProfile } from "api/profiles"
import { Preferences } from "components/Profile/Preferences"
import { enums } from "utils/enums"
import { inject } from "utils/misc"

export const TagRow = inject(Row, {
  flexWrap: "wrap",
})

export const Tag = inject(Badge, {
  marginBottom: 2,
  alignSelf: "flex-start",
})

export const Profile: FC<{ profile: TProfile }> = ({ profile }) => {
  return (
    <ScrollView>
      <Column m={8} mt={2} space={4} mb={32}>
        <Image
          source={{ uri: "https://images.dog.ceo/breeds/pitbull/20190801_154956.jpg" }}
          alt="user photo"
          borderRadius={8}
          style={{ height: 270 }} // todo: constant aspect ratio
        />
        <Column>
          <Text fontSize="2xl" mb={2}>
            {profile.username}, {profile.age}
          </Text>
          <TagRow space={2}>
            <Tag colorScheme={enums.gender[profile.gender.replace("Cis", "")].color}>
              {enums.gender[profile.gender.replace("Cis", "")].label}
            </Tag>
            <Tag colorScheme={enums.femAvatar[profile.femAvatar.toString()].color}>
              {enums.femAvatar[profile.femAvatar.toString()].label}
            </Tag>
          </TagRow>
          <TagRow space={2}>
            <Tag colorScheme={enums.role[profile.role].color}>{enums.role[profile.role].label}</Tag>
            <Tag colorScheme="gray">{enums.setup[profile.setup].label}</Tag>
            {profile.mute && <Tag colorScheme="gray">Mute</Tag>}
            {profile.furry && <Tag colorScheme="gray">Furry</Tag>}
          </TagRow>
        </Column>
        <Preferences preferences={profile.preferences} />
        <Text mb={2}>{profile.description}</Text>
      </Column>
    </ScrollView>
  )
}
