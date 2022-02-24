import React, { FC } from "react"
import { FlatList } from "react-native"

import { useProfileList } from "api/profiles"
import { ProfileCard, Screen } from "components"

export const ProfilesListScreen: FC = () => {
  const { data } = useProfileList(undefined, {
    query: {
      // staleTime: 60 * 1000,
    },
  })

  return (
    <Screen heading="Not liked/skipped">
      {data?.results && (
        <FlatList
          data={data.results}
          renderItem={({ item }) => (
            <ProfileCard
              tab="profilesList"
              profile={item}
              shouldHide={(profile) => profile.liked != null}
            />
          )}
          keyExtractor={(profile) => profile.id.toString()}
        />
      )}
    </Screen>
  )
}
