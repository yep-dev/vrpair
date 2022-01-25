import React, { FC } from "react"
import { Animated, StyleSheet, I18nManager, ViewStyle } from "react-native"

import { Text } from "native-base"
import {
  TabView,
  TabBar,
  NavigationState,
  SceneRendererProps,
  TabViewProps,
} from "react-native-tab-view"
import { Scene } from "react-native-tab-view/lib/typescript/types"

import { Screen } from "components"
import { colors } from "theme/colors"

export type TabsRoute = {
  key: string
  label: string
}

type State = NavigationState<TabsRoute>

type Props = {
  renderBadge?: (scene: Scene<TabsRoute>) => React.ReactNode
  setNavigationState(any): void
  styles: { indicator: ViewStyle; tabBar?: ViewStyle }
  disableTabNavigation?: boolean
}

export const Tabs: FC<Props & Omit<TabViewProps<TabsRoute>, "onIndexChange">> = ({
  renderBadge,
  setNavigationState,
  styles,
  disableTabNavigation,
  ...props
}) => {
  const renderIndicator = (
    props: SceneRendererProps & {
      navigationState: State
      getTabWidth: (i: number) => number
    },
  ) => {
    const { position, navigationState, getTabWidth } = props
    const inputRange = [0, 1]

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
          s.container,
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

  const renderIcon = ({ route }: { route: TabsRoute }) => <Text>{route.label}</Text>

  const handleIndexChange = (index) => setNavigationState((state) => ({ ...state, index }))

  const renderTabBar = (props: SceneRendererProps & { navigationState: State }) => (
    <TabBar
      {...props}
      renderLabel={renderIcon}
      renderBadge={renderBadge}
      renderIndicator={renderIndicator}
      style={[s.tabBar, styles.tabBar]}
      onTabPress={({ preventDefault }) => disableTabNavigation && preventDefault()}
    />
  )

  return (
    <Screen>
      <TabView
        renderTabBar={renderTabBar}
        tabBarPosition="top"
        onIndexChange={handleIndexChange}
        {...props}
      />
    </Screen>
  )
}

const s = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.transparent,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})
