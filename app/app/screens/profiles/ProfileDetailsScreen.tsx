import React, { FC } from "react"

import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useQuery } from "react-query"

import { useApi } from "api/apiProvider"
import { profilesKeys } from "api/profiles"
import { Screen, Profile, ProfileOverlays } from "components"
import { ProfilesListParams } from "navigators/app-navigator"

type Props = NativeStackScreenProps<ProfilesListParams, "profileDetails">

export const ProfileDetailsScreen: FC<Props> = ({ route }) => {
  const { profile } = route.params
  const api = useApi()
  const { data } = useQuery(profilesKeys.profileDetails(profile.id), ({ signal }) =>
    api.profiles.profileDetails({ signal, id: profile.id }),
  )

  return (
    <Screen>
      <Profile profile={data || profile} details={data} />
      <ProfileOverlays profile={data || profile} />
    </Screen>
  )
}
