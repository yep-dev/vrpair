import React, { FC } from "react"
import { TouchableOpacity } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { formatDistanceToNow } from "date-fns"
import { Badge, Box, Column, Flex, Image, Row, Text } from "native-base"

import { TProfile } from "api/profiles"
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

type Props = { profile: TProfile; date?: string; liked?: boolean; skipped?: boolean }

export const ProfileCard: FC<Props> = ({ profile, date, liked, skipped }) => {
  const { navigate } = useNavigation()

  return (
    <TouchableOpacity
      onPress={() =>
        navigate("profilesList", { screen: "profileDetails", params: { profile, liked, skipped } })
      }
      delayPressIn={50}
    >
      <Box
        borderBottomWidth="1"
        _dark={{
          borderColor: "gray.800",
        }}
        px="4"
        py="3"
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
              <Tag colorScheme={enums.gender[profile.gender.replace("Cis", "")].color}>
                {enums.gender[profile.gender.replace("Cis", "")].label}
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
            {date && (
              <Flex alignItems="flex-end">
                <Text fontSize="xs">
                  {formatDistanceToNow(new Date(date), { addSuffix: true })}
                </Text>
              </Flex>
            )}
          </Column>
        </Row>
      </Box>
    </TouchableOpacity>
  )
}
