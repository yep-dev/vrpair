import { TProfile } from "api/profiles"
import { Box, Column, Image, Row, Spacer, Text } from "native-base"
import React, { FC } from "react"

const ProfileCard: FC<{ profile: TProfile }> = ({ profile }) => (
  <Box
    borderBottomWidth="1"
    style={{
      borderColor: "gray.800",
    }}
    px="4"
    py="2"
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
        <Text bold>{profile.username}</Text>
      </Column>
      <Spacer />
    </Row>
  </Box>
)

export default ProfileCard
