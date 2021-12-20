import React, { FC } from "react"
import { FlatList } from "react-native"

import { Box } from "native-base"
import { useQuery } from "react-query"

import { useApi } from "api/apiProvider"
import { TProfileAndDate } from "api/likes"
import { ProfileCard } from "components/ProfileCard/ProfileCard"

export const PairsScreen: FC = () => {
  const api = useApi()
  const { data } = useQuery("pairsList", api.likes.pairsList)

  return (
    <Box>
      {data?.results && (
        <FlatList<TProfileAndDate>
          data={data.results}
          renderItem={({ item }) => <ProfileCard {...item} />}
          keyExtractor={(item) => item.profile.username}
        />
      )}
    </Box>
  )
}
