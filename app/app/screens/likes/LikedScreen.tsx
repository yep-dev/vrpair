import React, { FC } from "react"
import { FlatList } from "react-native"

import { useQuery } from "react-query"

import { useApi } from "api/apiProvider"
import { TProfileAndDate } from "api/likes"
import { ProfileCard, QueryContainer } from "components"

export const LikedScreen: FC = () => {
  const api = useApi()
  const query = useQuery("likedProfileList", api.likes.likedProfileList)

  return (
    <QueryContainer query={query} text="You didn't like any profile">
      <FlatList<TProfileAndDate>
        data={query?.data?.results}
        renderItem={({ item }) => <ProfileCard tab="likes" {...item} liked />}
        keyExtractor={(item) => item.profile.username}
      />
    </QueryContainer>
  )
}
