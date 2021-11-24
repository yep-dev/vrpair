import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { observer } from "mobx-react-lite"
import { useStore } from "mobx/utils"
import React from "react"
import { NavigationContainer, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LoginScreen, ProfilesListScreen } from "screens"
import { navigationRef } from "navigators/utils"
import { ProfilesCarouselScreen } from "screens/ProfilesCarousel/ProfilesCarouselScreen"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type RootParams = {
  login: undefined
  tabs: undefined
}

const Root = createNativeStackNavigator<RootParams>()

const AppStack = observer(() => {
  const { userStore } = useStore()

  return (
    <Root.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="login"
    >
      {userStore.isAuthenticated ? (
        <Root.Screen name="tabs" component={Tabs} />
      ) : (
        <Root.Screen name="login" component={LoginScreen} />
      )}
    </Root.Navigator>
  )
})

export type TabParams = {
  profilesCards
  profilesCarousel
  pairs
  user
}
const Tab = createBottomTabNavigator<TabParams>()

const Tabs = () => (
  <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
    <Tab.Screen name="profilesCards" component={ProfilesCarouselScreen} />
    <Tab.Screen name="profilesCarousel" component={ProfilesListScreen} />
    <Tab.Screen name="pairs" component={ProfilesCarouselScreen} />
    <Tab.Screen name="user" component={ProfilesCarouselScreen} />
  </Tab.Navigator>
)

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  return (
    <NavigationContainer ref={navigationRef} theme={DarkTheme} {...props}>
      <AppStack />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["login"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
