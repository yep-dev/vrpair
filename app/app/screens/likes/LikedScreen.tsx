import React, { FC } from "react"
import { FlatList } from "react-native"

import { Profile } from "api/index.schemas"
import { useLikedList } from "api/likes"
import { ProfileCard, QueryContainer } from "components"

export const LikedScreen: FC = () => {
  const query = useLikedList()

  return (
    <QueryContainer query={query} text="You didn't like any profile">
      <FlatList<Profile>
        data={query?.data?.results}
        renderItem={({ item }) => (
          <ProfileCard tab="likes" profile={item} shouldHide={(profile) => !profile.liked} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </QueryContainer>
  )
}
