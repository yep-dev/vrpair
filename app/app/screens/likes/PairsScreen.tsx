import React, { FC } from "react"
import { FlatList } from "react-native"

import { Badges } from "apiClient/likes"
import { useQueryClient } from "react-query"

import { Profile } from "api/index.schemas"
import { usePairList } from "api/likes"
import { badgesQueryKey } from "apiClient/queryKeys"
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
      <FlatList<Profile>
        data={query?.data?.results}
        renderItem={({ item }) => <ProfileCard tab="likes" profile={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </QueryContainer>
  )
}
