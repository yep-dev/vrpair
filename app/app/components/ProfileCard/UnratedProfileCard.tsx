import React, { FC } from "react"

import { useQuery } from "react-query"

import { RateProfile } from "api/index.schemas"
import { getRateProfileQueryKey } from "apiClient/custom"
import { ProfileCard, ProfileCardProps } from "components/ProfileCard/ProfileCard"

export const UnratedProfileCard: FC<ProfileCardProps> = (props) => {
  const { data } = useQuery<RateProfile>(getRateProfileQueryKey(props.profile.id), {
    enabled: false,
  })
  return data ? null : <ProfileCard {...props} />
}
