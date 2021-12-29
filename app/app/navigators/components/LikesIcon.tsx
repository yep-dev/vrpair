import React, { FC } from "react"

import { useQuery } from "react-query"

import { TBadges } from "api/likes"
import { HeartBalloonsIcon } from "components/icons/HeartBalloonsIcon"
import { RoundBadge } from "components/RoundBadge/RoundBadge"

type Props = {
  focused: boolean
  color: string
  size: number
}

export const LikesIcon: FC<Props> = (props) => {
  const { data } = useQuery<TBadges>("badges", { enabled: false })
  const likes = data?.likes || 0
  const pairs = data?.pairs || 0
  return (
    <>
      {(pairs > 0 || likes > 0) && (
        <RoundBadge position="absolute" top={0.5} right={2}>
          {pairs + likes}
        </RoundBadge>
      )}
      <HeartBalloonsIcon {...props} />
    </>
  )
}
