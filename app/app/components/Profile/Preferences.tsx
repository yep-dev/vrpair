import React, { FC } from "react"

import { Text, Column } from "native-base"

import { TPreferences } from "api/profiles"
import { Tag, TagRow } from "components/Profile/Profile"
import { enums } from "utils/enums"

export const Preferences: FC<{ preferences: TPreferences }> = ({ preferences }) => {
  const genderIncludes = (elements) => elements.every((value) => preferences.gender.includes(value))

  return (
    <Column>
      <Text mb={2}>Preferences</Text>
      {genderIncludes(Object.keys(enums.gender)) ? (
        <Tag colorScheme="green">Everyone</Tag>
      ) : (
        <TagRow space={2}>
          {["maleCis", "maleTrans"].some((value) => preferences.gender.includes(value)) && (
            <Tag colorScheme={enums.gender.male.color}>
              {genderIncludes(["maleCis", "maleTrans"])
                ? enums.gender.male.label
                : genderIncludes(["maleCis"])
                ? enums.gender.maleCis.label
                : enums.gender.maleTrans.label}
            </Tag>
          )}
          {["femaleCis", "femaleTrans"].some((value) => preferences.gender.includes(value)) && (
            <Tag colorScheme={enums.gender.female.color}>
              {genderIncludes(["femaleCis", "femaleTrans"])
                ? enums.gender.female.label
                : genderIncludes(["femaleCis"])
                ? enums.gender.femaleCis.label
                : enums.gender.femaleTrans.label}
            </Tag>
          )}
          {genderIncludes(["nonBinary"]) && (
            <Tag colorScheme={enums.gender.nonBinary.color}>Non-Binary</Tag>
          )}
        </TagRow>
      )}
      <Tag colorScheme={enums.femAvatar[preferences.femAvatar].label}>
        {enums.femAvatar[preferences.femAvatar].label}
      </Tag>
      <TagRow space={2}>
        {preferences.role.map((role) => (
          <Tag key={role} colorScheme={enums.role[role].color}>
            {enums.role[role].label}
          </Tag>
        ))}
      </TagRow>
      <TagRow space={2}>
        {Object.keys(enums.setup).every((value) => preferences.setup.includes(value)) ? (
          <Tag colorScheme="green">Any VR setup</Tag>
        ) : (
          preferences.setup.map((setup) => (
            <Tag key={setup} colorScheme="gray">
              {enums.setup[setup].label}
            </Tag>
          ))
        )}
      </TagRow>
      <TagRow space={2}>
        {preferences.mute !== "any" && (
          <Tag colorScheme="gray">{enums.mute[preferences.mute.toString()].label}</Tag>
        )}
        {preferences.furry !== "any" && (
          <Tag colorScheme="gray">{enums.furry[preferences.furry.toString()].label}</Tag>
        )}
      </TagRow>
    </Column>
  )
}