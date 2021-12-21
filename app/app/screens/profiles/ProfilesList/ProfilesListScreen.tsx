import React, { FC } from "react"
import { FlatList } from "react-native"

import { useQuery } from "react-query"

import { useApi } from "api/apiProvider"
import { TProfile } from "api/profiles"
import { Screen } from "components"
import { ProfileCard } from "components/ProfileCard/ProfileCard"

export const ProfilesListScreen: FC = () => {
  const api = useApi()
  const { data } = useQuery("profileList", api.profiles.profileList, { staleTime: 60 * 1000 })

  return (
    <Screen>
      {data?.results && (
        <FlatList<TProfile>
          data={data.results}
          renderItem={({ item }) => <ProfileCard tab="profilesList" profile={item} />}
          keyExtractor={(profile) => profile.username}
        />
      )}
    </Screen>
  )
}
