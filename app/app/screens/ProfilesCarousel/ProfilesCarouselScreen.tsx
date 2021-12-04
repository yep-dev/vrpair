import { useApi } from "api/apiProvider"
import { CircleHeartIcon } from "components/icons"
import { Profile } from "components/Profile/Profile"
import React, { FC } from "react"
import { Screen } from "components"
import Carousel from "react-native-reanimated-carousel"
import { useQuery } from "react-query"
import colors from "theme/colors"

export const ProfilesCarouselScreen: FC = () => {
  const api = useApi()
  const { data } = useQuery("profileList", api.profiles.profileList)

  return (
    <Screen>
      {data ? (
        <Carousel
          width={400}
          data={data.results}
          renderItem={(profile) => <Profile profile={profile} />}
        />
      ) : null}
      <CircleHeartIcon color={colors.pink["400"]} />
    </Screen>
  )
}
