import React, { FC } from "react"
import { FlatList } from "react-native"

import { useQueryClient } from "react-query"

import { usePairList } from "api/likes"
import { Badges, badgesQueryKey } from "apiClient/custom"
import { ProfileCard, QueryContainer } from "components"

export const PairsScreen: FC = () => {
  const queryClient = useQueryClient()
  const query = usePairList({
    query: {
      onSuccess: (data) => {
        queryClient.setQueryData<Badges>(badgesQueryKey, (badges) => ({
          ...badges,
          pairs: data.pairsBadge,
        }))
      },
    },
  })

  return (
    <QueryContainer query={query} text="You have no pairs yet">
      <FlatList
        data={query?.data?.results}
        renderItem={({ item }) => <ProfileCard tab="likes" profile={item.profile} pair={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </QueryContainer>
  )
}
