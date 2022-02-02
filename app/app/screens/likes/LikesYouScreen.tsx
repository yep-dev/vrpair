import React, { FC } from "react"
import { FlatList } from "react-native"

import { useQuery, useQueryClient } from "react-query"

import { useApi } from "api/apiProvider"
import { TBadges } from "api/likes"
import { TProfile } from "api/profiles"
import { ProfileCard, QueryContainer } from "components"

export const LikesYouScreen: FC = () => {
  const api = useApi()
  const queryClient = useQueryClient()
  const query = useQuery("likesList", api.likes.likesList, {
    onSuccess: (data) => {
      queryClient.setQueryData<TBadges>("badges", (badges) => ({
        ...badges,
        likes: data.likesBadge,
      }))
    },
  })

  return (
    <QueryContainer query={query} text="You have no likes yet">
      <FlatList<TProfile>
        data={query?.data?.results}
        renderItem={({ item }) => <ProfileCard tab="likes" profile={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </QueryContainer>
  )
}
