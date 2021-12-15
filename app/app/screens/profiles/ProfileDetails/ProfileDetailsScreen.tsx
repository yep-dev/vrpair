import { RouteProp } from "@react-navigation/native"
import { Screen } from "components"
import { Profile } from "components/Profile/Profile"
import { ProfileOverlays } from "components/ProfileOverlays/ProfileOverlays"
import { ProfilesListParams } from "navigators/app-navigator"
import React, { FC } from "react"

type Props = {
  route: RouteProp<ProfilesListParams, "profileDetails">
}

export const ProfileDetailsScreen: FC<Props> = ({ route }) => {
  const { profile } = route.params

  return (
    <Screen>
      <Profile profile={profile} />
      <ProfileOverlays />
    </Screen>
  )
}
