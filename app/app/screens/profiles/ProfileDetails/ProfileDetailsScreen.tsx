import React, { FC } from "react"

import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { useProfileDetails } from "api/profiles"
import { Screen, Profile, ProfileOverlays } from "components"
import { ProfilesListParams } from "navigators/app-navigator"

type Props = NativeStackScreenProps<ProfilesListParams, "profileDetails">

export const ProfileDetailsScreen: FC<Props> = ({ route }) => {
  const { profile, liked } = route.params
  const { data } = useProfileDetails(profile.id)

  return (
    <Screen>
      <Profile details={data} profile={data || profile} />
      <ProfileOverlays liked={liked} profile={data || profile} />
    </Screen>
  )
}
