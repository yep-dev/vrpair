import React, { FC, useState } from "react"
import { StyleSheet } from "react-native"

import { SceneMap, NavigationState } from "react-native-tab-view"
import { useQuery } from "react-query"

import { Badges } from "api/likes"
import { RoundBadge, Tabs, TabsRoute } from "components"
import { LikedScreen } from "screens/likes/LikedScreen"
import { LikesYouScreen } from "screens/likes/LikesYouScreen"
import { PairsScreen } from "screens/likes/PairsScreen"
import { colors } from "theme/colors"

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
  const { data: badgesData } = useQuery<Badges>("badges", { enabled: false })
  const [navigationState, setNavigationState] = useState<NavigationState<TabsRoute>>({
    routes,
    index: 0,
  })

  const renderBadge = ({ route }: { route: TabsRoute }) => {
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
      styles={{ indicator: s.indicator }}
    />
  )
}

const s = StyleSheet.create({
  indicator: {
    backgroundColor: colors.gray["800"],
    width: 48,
    height: 16,
    borderRadius: 12,
    margin: 6,
  },
})
