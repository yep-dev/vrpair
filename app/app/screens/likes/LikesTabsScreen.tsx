import React, { FC, useState } from "react"

import { SceneMap, NavigationState } from "react-native-tab-view"
import { useQuery } from "react-query"

import { TBadges } from "api/likes"
import { RoundBadge, Tabs } from "components"
import { LikedScreen } from "screens/likes/LikedScreen"
import { LikesYouScreen } from "screens/likes/LikesYouScreen"
import { PairsScreen } from "screens/likes/PairsScreen"

type Route = {
  key: string
  label: string
}

const routes = [
  {
    key: "pairs",
    label: "Pairs",
  },
  {
    key: "likes",
    label: "Likes You",
  },
  {
    key: "liked",
    label: "Liked",
  },
]

export const LikesTabsScreen: FC = () => {
  const { data: badgesData } = useQuery<TBadges>("badges", { enabled: false })
  const [navigationState, setNavigationState] = useState<NavigationState<Route>>({
    routes,
    index: 0,
  })

  const renderBadge = ({ route }: { route: Route }) => {
    if (["pairs", "likes"].includes(route.key)) {
      if (badgesData && badgesData[route.key] > 0) {
        return <RoundBadge>{badgesData[route.key]}</RoundBadge>
      }
    }

    return null
  }

  const renderScene = SceneMap({
    pairs: PairsScreen,
    likes: LikesYouScreen,
    liked: LikedScreen,
  })

  return (
    <Tabs
      renderScene={renderScene}
      renderBadge={renderBadge}
      navigationState={navigationState}
      setNavigationState={setNavigationState}
    />
  )
}
