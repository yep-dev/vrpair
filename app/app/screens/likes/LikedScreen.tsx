import React, { FC } from "react"
import { FlatList } from "react-native"

import { useLikedList } from "api/likes"
import { QueryContainer, LikedProfileCard } from "components"

export const LikedScreen: FC = () => {
  const query = useLikedList()

  return (
    <QueryContainer query={query} text="You didn't like any profile">
      <FlatList
        data={query?.data?.results}
        keyExtractor={(item) => item.profile.id.toString()}
        renderItem={({ item }) => <LikedProfileCard ratedProfile={item} tab="likes" />}
      />
    </QueryContainer>
  )
}
