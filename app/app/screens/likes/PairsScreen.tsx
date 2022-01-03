import React, { FC } from "react"
import { FlatList } from "react-native"

import { useQuery, useQueryClient } from "react-query"

import { useApi } from "api/apiProvider"
import { TBadges, TProfileAndDate } from "api/likes"
import { ProfileCard, QueryContainer } from "components"

export const PairsScreen: FC = () => {
  const api = useApi()
  const queryClient = useQueryClient()
  const query = useQuery("pairsList", api.likes.pairsList, {
    onSuccess: (data) => {
      queryClient.setQueryData<TBadges>("badges", (badges) => ({
        ...badges,
        pairs: data.pairsBadge,
      }))
    },
  })

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
