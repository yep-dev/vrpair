import React, { FC } from "react"
import { FlatList } from "react-native"

import { useQuery } from "react-query"

import { useApi } from "api/apiProvider"
import { profilesKeys, Profile } from "api/profiles"
import { Screen, ProfileCard } from "components"

export const ProfilesListScreen: FC = () => {
  const api = useApi()
  const { data } = useQuery(profilesKeys.profileList, api.profiles.profileList, {
    staleTime: 60 * 1000,
  })

  return (
    <Screen>
      {data?.results && (
        <FlatList<Profile>
          data={data.results}
          renderItem={({ item }) => <ProfileCard tab="profilesList" profile={item} hideRated />}
          keyExtractor={(profile) => profile.id.toString()}
        />
      )}
    </Screen>
  )
}
