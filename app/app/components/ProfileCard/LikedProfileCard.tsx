import React, { FC } from "react"

import { useQuery } from "react-query"

import { RatedProfileDeep, RateProfile } from "api/index.schemas"
import { getRateProfileQueryKey } from "apiClient/custom"
import { ProfileCard, ProfileCardProps } from "components"

type Props = {
  ratedProfile: RatedProfileDeep
} & Omit<ProfileCardProps, "profile">

export const LikedProfileCard: FC<Props> = ({ ratedProfile, ...props }) => {
  const { data } = useQuery<RateProfile>(getRateProfileQueryKey(ratedProfile.profile.id), {
    enabled: false,
  })
  ratedProfile = data ? { ...data, likes: false, profile: ratedProfile.profile } : ratedProfile
  return ratedProfile.liked ? (
    <ProfileCard profile={ratedProfile.profile} ratedProfile={ratedProfile} {...props} />
  ) : null
}
