import React, { FC } from "react"
import { FlatList } from "react-native"

import { useQuery } from "react-query"

import { useApi } from "api/apiProvider"
import { TProfileAndDate } from "api/likes"
import { ProfileCard, QueryContainer } from "components"

export const LikesYouScreen: FC = () => {
  const api = useApi()
  const query = useQuery("likesList", api.likes.likesList)

  return (
    <QueryContainer query={query} text="You have no likes yet">
      <FlatList<TProfileAndDate>
        data={query?.data?.results}
        renderItem={({ item }) => <ProfileCard tab="likes" {...item} />}
        keyExtractor={(item) => item.profile.username}
      />
    </QueryContainer>
  )
}
