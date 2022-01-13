import React, { useState } from "react"
import { StyleSheet } from "react-native"

import { Text } from "native-base"
import { NavigationState, SceneMap } from "react-native-tab-view"

import { Tabs, TabsRoute } from "components"
import { colors } from "theme/colors"

const routes = ["1", "2", "3", "4"].map((key) => ({ key, label: key }))

export const SetupScreen = () => {
  const [navigationState, setNavigationState] = useState<NavigationState<TabsRoute>>({
    routes,
    index: 0,
  })
  const renderScene = SceneMap({
    "1": () => <Text>1</Text>,
    "2": () => <Text>2</Text>,
    "3": () => <Text>3</Text>,
    "4": () => <Text>4</Text>,
  })

  return (
    <Tabs
      renderScene={renderScene}
      navigationState={navigationState}
      setNavigationState={setNavigationState}
      styles={{ indicator: s.indicator, tabBar: s.tabBar }}
    />
  )
}

const s = StyleSheet.create({
  indicator: {
    backgroundColor: colors.gray["800"],
    width: 20,
    height: 20,
    borderRadius: 10,
    margin: 6,
  },
  tabBar: {
    marginHorizontal: 32,
  },
})
