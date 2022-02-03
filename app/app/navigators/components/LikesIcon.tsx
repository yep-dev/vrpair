import React, { FC } from "react"

import { useQuery } from "react-query"

import { Badges } from "api/likes"
import { RoundBadge } from "components"
import { HeartBalloonsIcon } from "components/icons"

type Props = {
  color: string
}

export const LikesIcon: FC<Props> = (props) => {
  const { data } = useQuery<Badges>("badges", { enabled: false })
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
