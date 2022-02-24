import React, { FC } from "react"

import { useQuery } from "react-query"

import { RatedProfile, RateProfile } from "api/index.schemas"
import { getRateProfileQueryKey } from "apiClient/queryKeys"
import { ProfileCard, ProfileCardProps } from "components/ProfileCard/ProfileCard"

type Props = {
  ratedProfile: RatedProfile
} & Omit<ProfileCardProps, "profile">

export const LikedProfileCard: FC<Props> = ({ ratedProfile, ...props }) => {
  const { data } = useQuery<RateProfile>(getRateProfileQueryKey(ratedProfile.profile.id), {
    enabled: false,
  })
  ratedProfile = data ? { ...data, likes: false, profile: ratedProfile.profile } : ratedProfile
  return ratedProfile.liked ? <ProfileCard profile={ratedProfile.profile} {...props} /> : null
}