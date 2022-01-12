import React, { FC } from "react"
import { Animated, StyleSheet, I18nManager } from "react-native"

import { Text } from "native-base"
import { TabView, TabBar, NavigationState, SceneRendererProps } from "react-native-tab-view"
import { Scene } from "react-native-tab-view/lib/typescript/types"

import { Screen } from "components"
import { colors } from "theme/colors"

type Route = {
  key: string
  label: string
}

type State = NavigationState<Route>

type Props = {
  renderScene: (props: SceneRendererProps & { route: Route }) => React.ReactNode
  renderBadge?: (scene: Scene<Route>) => React.ReactNode
  navigationState: any
  setNavigationState(any): void
}

export const Tabs: FC<Props> = ({
  renderScene,
  renderBadge,
  navigationState,
  setNavigationState,
}) => {
  const renderIndicator = (
    props: SceneRendererProps & {
      navigationState: State
      getTabWidth: (i: number) => number
    },
  ) => {
    const { position, navigationState, getTabWidth } = props
    const inputRange = [0, 0.48, 0.49, 0.51, 0.52, 1, 1.48, 1.49, 1.51, 1.52, 2]

    const scale = position.interpolate({
      inputRange,
      outputRange: inputRange.map((x) => (Math.trunc(x) === x ? 2 : 0.1)),
    })

    const opacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map((x) => {
        const d = x - Math.trunc(x)
        return d === 0.49 || d === 0.51 ? 0 : 1
      }),
    })

    const translateX = position.interpolate({
      inputRange: inputRange,
      outputRange: inputRange.map((x) => {
        const i = Math.round(x)
        return i * getTabWidth(i) * (I18nManager.isRTL ? -1 : 1)
      }),
    })

    return (
      <Animated.View
        style={[
          styles.container,
          {
            width: `${100 / navigationState.routes.length}%`,
            transform: [{ translateX }] as any,
          },
        ]}
      >
        <Animated.View style={[styles.indicator, { opacity, transform: [{ scale }] } as any]} />
      </Animated.View>
    )
  }

  const renderIcon = ({ route }: { route: Route }) => <Text>{route.label}</Text>

  const handleIndexChange = (index) => setNavigationState((state) => ({ ...state, index }))

  const renderTabBar = (props: SceneRendererProps & { navigationState: State }) => (
    <TabBar
      {...props}
      renderLabel={renderIcon}
      renderBadge={renderBadge}
      renderIndicator={renderIndicator}
      style={styles.tabbar}
    />
  )

  return (
    <Screen>
      <TabView
        navigationState={navigationState}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        tabBarPosition="top"
        onIndexChange={handleIndexChange}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: colors.transparent,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    backgroundColor: colors.gray["800"],
    width: 48,
    height: 16,
    borderRadius: 12,
    margin: 6,
  },
})
