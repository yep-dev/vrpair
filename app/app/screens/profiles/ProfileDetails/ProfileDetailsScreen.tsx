import React, { FC } from "react"

import { RouteProp } from "@react-navigation/native"
import { useMutation } from "react-query"

import { useApi } from "api/apiProvider"
import { Screen } from "components"
import { Profile } from "components/Profile/Profile"
import { ProfileOverlays } from "components/ProfileOverlays/ProfileOverlays"
import { ProfilesListParams } from "navigators/app-navigator"

type Props = {
  route: RouteProp<ProfilesListParams, "profileDetails">
}

export const ProfileDetailsScreen: FC<Props> = ({ route }) => {
  const api = useApi()
  const { profile, liked, skipped } = route.params
  const likeProfile = useMutation(api.likes.likeProfile)
  const skipProfile = useMutation(api.likes.skipProfile)

  const handleLike = () => {
    likeProfile.mutate({ profileId: profile.id })
  }

  const handleSkip = () => {
    skipProfile.mutate({ profileId: profile.id })
  }

  return (
    <Screen>
      <Profile profile={profile} />
      <ProfileOverlays
        handleLike={handleLike}
        handleSkip={handleSkip}
        liked={liked}
        skipped={skipped}
      />
    </Screen>
  )
}
