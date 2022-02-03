import React, { FC } from "react"
import { FlatList } from "react-native"

import { useQuery, useQueryClient } from "react-query"

import { useApi } from "api/apiProvider"
import { likesKeys, Badges } from "api/likes"
import { Profile } from "api/profiles"
import { ProfileCard, QueryContainer } from "components"

export const LikesYouScreen: FC = () => {
  const api = useApi()
  const queryClient = useQueryClient()
  const query = useQuery(likesKeys.likesList, api.likes.likesList, {
    onSuccess: (data) => {
      queryClient.setQueryData<Badges>(likesKeys.badges, (badges) => ({
        ...badges,
        likes: data.likesBadge,
      }))
    },
  })

  return (
    <QueryContainer query={query} text="You have no likes yet">
      <FlatList<Profile>
        data={query?.data?.results}
        renderItem={({ item }) => <ProfileCard tab="likes" profile={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </QueryContainer>
  )
}
