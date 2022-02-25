import React, { FC } from "react"

import { useQuery } from "react-query"

import { Badges, badgesQueryKey } from "apiClient/custom"
import { RoundBadge } from "components"
import { HeartBalloonsIcon } from "components/icons"

type Props = {
  color: string
}

export const LikesIcon: FC<Props> = (props) => {
  const { data } = useQuery<Badges>(badgesQueryKey, { enabled: false })
  const likes = data?.likes || 0
  const pairs = data?.pairs || 0
  return (
    <>
      {(pairs > 0 || likes > 0) && (
        <RoundBadge position="absolute" right={2} top={0.5}>
          {pairs + likes}
        </RoundBadge>
      )}
      <HeartBalloonsIcon {...props} />
    </>
  )
}
