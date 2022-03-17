import React, { FC } from "react"
import { FlatList } from "react-native"

import { useProfileList } from "api/profiles"
import { Screen } from "components"
import { UnratedProfileCard } from "components/ProfileCard/UnratedProfileCard"

export const ProfilesListScreen: FC = () => {
  const { data } = useProfileList(undefined, {
    query: {
      staleTime: 10 * 60 * 1000,
    },
  })

  return (
    <Screen heading="Not liked/skipped">
      {data?.results && (
        <FlatList
          data={data.results}
          keyExtractor={(profile) => profile.id.toString()}
          renderItem={({ item }) => <UnratedProfileCard profile={item} tab="profilesList" />}
        />
      )}
    </Screen>
  )
}
