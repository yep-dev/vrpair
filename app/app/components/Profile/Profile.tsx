import * as profiles from "api/profiles"
import { Badge, Flex, HStack, Image, Text, VStack } from "native-base"
import React, { FC } from "react"
import styled from "styled-components"
import { enums } from "utils/enums"

const Row = styled(HStack)`
  flex-wrap: wrap;
`

const Tag = styled(Badge)`
  margin-bottom: 8px;
  align-self: flex-start;
`

export const Profile: FC<{ profile: profiles.Profile }> = ({ profile }) => {
  const genderIncludes = (elements) =>
    elements.every((value) => profile.preferences.gender.includes(value))

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
          <Tag colorScheme={enums.gender[profile.gender].color}>
            {enums.gender[profile.gender].label}
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
      {preferences && (
        <VStack>
          <Text mb={2}>Preferences</Text>
          {genderIncludes(Object.keys(enums.gender)) ? (
            <Tag colorScheme="green">Everyone</Tag>
          ) : (
            <Row space={2}>
              {["male", "maleTrans"].some((value) => preferences.gender.includes(value)) && (
                <Tag colorScheme={enums.gender.male.color}>
                  {genderIncludes(["male", "maleTrans"])
                    ? "Male"
                    : genderIncludes(["male"])
                    ? "Cis Male"
                    : "Trans Male"}
                </Tag>
              )}
              {["female", "femaleTrans"].some((value) => preferences.gender.includes(value)) && (
                <Tag colorScheme={enums.gender.female.color}>
                  {genderIncludes(["female", "femaleTrans"])
                    ? "Female"
                    : genderIncludes(["female"])
                    ? "Cis Female"
                    : "Trans Female"}
                </Tag>
              )}
              {genderIncludes(["nonBinary"]) && (
                <Tag colorScheme={enums.gender.nonBinary.color}>Non-Binary</Tag>
              )}
            </Row>
          )}
          <Tag colorScheme={enums.femAvatar[preferences.femAvatar].label}>
            {enums.femAvatar[preferences.femAvatar].label}
          </Tag>
          <Row space={2}>
            {profile.preferences.role.map((role) => (
              <Tag colorScheme={enums.role[role].color}>{enums.role[role].label}</Tag>
            ))}
          </Row>
          <Row space={2}>
            {Object.keys(enums.setup).every((value) =>
              profile.preferences.setup.includes(value),
            ) ? (
              <Tag colorScheme="green">Any VR setup</Tag>
            ) : (
              profile.preferences.setup.map((setup) => (
                <Tag colorScheme="gray">{enums.setup[setup].label}</Tag>
              ))
            )}
          </Row>
          <Row space={2}>
            {preferences.mute !== "any" && (
              <Tag colorScheme="gray">{enums.mute[preferences.mute.toString()].label}</Tag>
            )}
            {preferences.furry !== "any" && (
              <Tag colorScheme="gray">{enums.furry[preferences.furry.toString()].label}</Tag>
            )}
          </Row>
        </VStack>
      )}
    </Flex>
  )
}
