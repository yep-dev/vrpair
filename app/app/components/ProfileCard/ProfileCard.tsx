import { TProfile } from "api/profiles"
import { Badge, Box, Column, Image, Row, Spacer, Text } from "native-base"
import React, { FC } from "react"
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

const ProfileCard: FC<{ profile: TProfile }> = ({ profile }) => (
  <Box
    borderBottomWidth="1"
    _dark={{
      borderColor: "gray.800",
    }}
    px="4"
    py="3"
  >
    <Row space={3} justifyContent="space-between">
      <Box>
        <Image
          source={{ uri: "https://images.dog.ceo/breeds/pitbull/20190801_154956.jpg" }}
          alt="profile thumbnail"
          style={{ height: 90, width: 120, borderRadius: 4 }}
        />
      </Box>
      <Column>
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
          <Tag colorScheme={enums.role[profile.role].color}>{enums.role[profile.role].label}</Tag>
          <Tag colorScheme="gray">{enums.setup[profile.setup].label}</Tag>
          {profile.mute && <Tag colorScheme="gray">Mute</Tag>}
          {profile.furry && <Tag colorScheme="gray">Furry</Tag>}
        </TagRow>
      </Column>
      <Spacer />
    </Row>
  </Box>
)

export default ProfileCard
