import React, { FC } from "react"
import { FlatList } from "react-native"

import { useQueryClient } from "react-query"

import { useLikesList } from "api/likes"
import { Badges, badgesQueryKey } from "apiClient/custom"
import { ProfileCard, QueryContainer } from "components"

export const LikesYouScreen: FC = () => {
  const queryClient = useQueryClient()
  const query = useLikesList({
    query: {
      onSuccess: (data) => {
        queryClient.setQueryData<Badges>(badgesQueryKey, (badges) => ({
          ...badges,
          likes: data.likesBadge,
        }))
      },
    },
  })

  return (
    <QueryContainer query={query} text="You have no likes yet">
      <FlatList
        data={query?.data?.results}
        renderItem={({ item }) => (
          <ProfileCard tab="likes" profile={item.profile} ratedProfile={item} />
        )}
        keyExtractor={(item) => item.profile.id.toString()}
      />
    </QueryContainer>
  )
}
