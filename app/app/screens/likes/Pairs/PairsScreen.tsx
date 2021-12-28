import React, { FC } from "react"
import { FlatList } from "react-native"

import { useQuery } from "react-query"

import { useApi } from "api/apiProvider"
import { TProfileAndDate } from "api/likes"
import { ProfileCard } from "components/ProfileCard/ProfileCard"
import { QueryContainer } from "components/QueryContainer/QueryContainer"

export const PairsScreen: FC = () => {
  const api = useApi()
  const query = useQuery("pairsList", api.likes.pairsList)

  return (
    <QueryContainer query={query} text="You have no pairs yet">
      <FlatList<TProfileAndDate>
        data={query?.data?.results}
        renderItem={({ item }) => <ProfileCard tab="likes" {...item} />}
        keyExtractor={(item) => item.profile.username}
      />
    </QueryContainer>
  )
}
