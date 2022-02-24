import React, { FC } from "react"
import { FlatList } from "react-native"

import { useLikedList } from "api/likes"
import { QueryContainer } from "components"
import { LikedProfileCard } from "components/ProfileCard/LikedProfileCard"

export const LikedScreen: FC = () => {
  const query = useLikedList()

  return (
    <QueryContainer query={query} text="You didn't like any profile">
      <FlatList
        data={query?.data?.results}
        renderItem={({ item }) => <LikedProfileCard tab="likes" ratedProfile={item} />}
        keyExtractor={(item) => item.profile.id.toString()}
      />
    </QueryContainer>
  )
}
