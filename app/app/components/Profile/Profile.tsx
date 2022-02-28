import React, { FC } from "react"

import {Badge, Image, Text, Row, Column, ScrollView, View} from "native-base"

import { Profile as TProfile, ProfileDetails } from "api/index.schemas"
import { Preferences } from "components"
import { enums } from "utils/enums"
import { inject } from "utils/misc"

export const TagRow = inject(Row, {
  flexWrap: "wrap",
})

export const Tag = inject(Badge, {
  marginBottom: 2,
  alignSelf: "flex-start",
})

type Props = {
  profile: TProfile
  details?: ProfileDetails
}

export const Profile: FC<Props> = ({ profile, details }) => {
  return (
    <ScrollView>
      <Column m={8} mb={32} mt={2} space={4}>
        <Image
          alt="user photo"
          borderRadius={8}
          source={{ uri: "https://images.dog.ceo/breeds/pitbull/20190801_154956.jpg" }}
          style={{ height: 270 }} // todo: constant aspect ratio
        />
        <Column>
          <Text fontSize="2xl" mb={2}>
            {profile.username}, {profile.age}
          </Text>
          <TagRow space={2}>
            <Tag colorScheme={enums.gender[profile.gender].color}>
              {enums.gender[profile.gender].label}
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
        {details && (
          <View>
            {details.preferences && <Preferences preferences={details.preferences} />}
            <Text mb={2}>{details.description}</Text>
          </View>
        )}
      </Column>
    </ScrollView>
  )
}
