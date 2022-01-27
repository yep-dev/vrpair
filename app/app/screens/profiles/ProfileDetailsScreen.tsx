import React, { FC } from "react"

import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { Screen, Profile, ProfileOverlays } from "components"
import { ProfilesListParams } from "navigators/app-navigator"

type Props = NativeStackScreenProps<ProfilesListParams, "profileDetails">

export const ProfileDetailsScreen: FC<Props> = ({ route }) => {
  const { profile, liked, skipped } = route.params

  return (
    <Screen>
      <Profile profile={profile} />
      <ProfileOverlays profileId={profile.id} liked={liked} skipped={skipped} />
    </Screen>
  )
}
