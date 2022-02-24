import React, { FC } from "react"
import { TouchableOpacity } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { formatDistanceToNow } from "date-fns"
import { Badge, Box, Column, Flex, Image, Row, Text } from "native-base"
import { useQuery } from "react-query"

import { Pair, Profile, ProfileDetails, RatedProfile } from "api/index.schemas"
import { getProfileDetailsQueryKey } from "api/profiles"
import { TabNavigationProps, TabParams } from "navigators/app-navigator"
import { enums } from "utils/enums"
import { inject } from "utils/misc"

const TagRow = inject(Row, {
  flexWrap: "wrap",
})

const Tag = inject(Badge, {
  _text: { fontSize: "2xs" },
  px: 1,
  py: 0.25,
  mb: 1,
  alignSelf: "flex-start",
})

export type ProfileCardProps = {
  tab: keyof TabParams
  profile: Profile
  ratedProfile?: RatedProfile
  pair?: Pair
}

export const ProfileCard: FC<ProfileCardProps> = ({ tab, profile, ratedProfile, pair }) => {
  const { navigate } = useNavigation<TabNavigationProps>()
  const { data } = useQuery<ProfileDetails>(getProfileDetailsQueryKey(profile.id), {
    enabled: false,
  })
  profile = data || profile

  return (
    <TouchableOpacity
      onPress={() => navigate(tab, { screen: "profileDetails", params: { profile } })}
      delayPressIn={50}
    >
      <Box
        borderBottomWidth="1"
        _dark={{
          borderColor: "gray.800",
        }}
        px="4"
        py="3"
        borderLeftWidth={2}
        borderLeftColor={ratedProfile?.likes ? "yellow.500" : "transparent"}
      >
        <Row space={3}>
          <Box>
            <Image
              source={{ uri: "https://images.dog.ceo/breeds/pitbull/20190801_154956.jpg" }}
              alt="profile thumbnail"
              style={{ height: 90, width: 120, borderRadius: 4 }}
            />
          </Box>
          <Column flex={1}>
            <Text fontSize="lg" mb={1}>
              {profile.username}, {profile.age}
            </Text>
            <TagRow space={1}>
              <Tag colorScheme={enums.gender[profile.gender].color}>
                {enums.gender[profile.gender].label}
              </Tag>
              <Tag colorScheme={enums.femAvatar[profile.femAvatar.toString()].color}>
                {enums.femAvatar[profile.femAvatar.toString()].label}
              </Tag>
            </TagRow>
            <TagRow space={1}>
              <Tag colorScheme={enums.role[profile.role].color}>
                {enums.role[profile.role].label}
              </Tag>
              <Tag colorScheme="gray">{enums.setup[profile.setup].label}</Tag>
              {profile.mute && <Tag colorScheme="gray">Mute</Tag>}
              {profile.furry && <Tag colorScheme="gray">Furry</Tag>}
            </TagRow>
            {(pair || ratedProfile) && (
              <Flex alignItems="flex-end">
                <Text fontSize="xs">
                  {formatDistanceToNow(new Date(pair?.date || ratedProfile?.date || ""), {
                    addSuffix: true,
                  })}
                </Text>
              </Flex>
            )}
          </Column>
        </Row>
      </Box>
    </TouchableOpacity>
  )
}