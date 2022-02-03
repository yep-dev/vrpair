import React, { FC } from "react"
import { FlatList } from "react-native"

import { useQuery } from "react-query"

import { useApi } from "api/apiProvider"
import { likesKeys } from "api/likes"
import { Profile } from "api/profiles"
import { ProfileCard, QueryContainer } from "components"

export const LikedScreen: FC = () => {
  const api = useApi()
  const query = useQuery(likesKeys.likedList, api.likes.likedList)

  return (
    <QueryContainer query={query} text="You didn't like any profile">
      <FlatList<Profile>
        data={query?.data?.results}
        renderItem={({ item }) => <ProfileCard tab="likes" profile={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </QueryContainer>
  )
}
