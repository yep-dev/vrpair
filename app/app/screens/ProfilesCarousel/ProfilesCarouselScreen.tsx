import { useApi } from "api/apiProvider"
import { Text } from "native-base"
import React, { FC } from "react"
import { Screen } from "components"
import Carousel from "react-native-reanimated-carousel"
import { useQuery } from "react-query"

export const ProfilesCarouselScreen: FC = () => {
  const api = useApi()
  const { data } = useQuery("profileList", api.profiles.profileList)

  return (
    <Screen>
      {data ? (
        <Carousel
          width={400}
          data={data.results}
          renderItem={({ username }) => {
            return <Text>{username}</Text>
          }}
        />
      ) : null}
    </Screen>
  )
}
