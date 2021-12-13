import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { TProfile } from "api/profiles"
import { HeartBalloonsIcon } from "components/icons/HeartBalloonsIcon"
import { ProfileIcon } from "components/icons/ProfileIcon"
import { ProfileSearchIcon } from "components/icons/ProfileSearchIcon"
import { ProfileStackIcon } from "components/icons/ProfileStackIcon"
import { observer } from "mobx-react-lite"
import { useStore } from "mobx/utils"
import { NavigationContainer, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LoginScreen, ProfilesListScreen } from "screens"
import { navigationRef } from "navigators/utils"
import ProfileDetailsScreen from "screens/ProfileDetails/ProfileDetailsScreen"
import { ProfilesCarouselScreen } from "screens/ProfilesCarousel/ProfilesCarouselScreen"
import { UserMenuScreen } from "screens/user/UserMenu/UserMenu"

// ---------------- Root ----------------

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}
export type AppParams = {
  login
  tabs
}
const App = createNativeStackNavigator<AppParams>()

export const AppNavigator = observer((props: NavigationProps) => {
  const { userStore } = useStore()

  return (
    <NavigationContainer ref={navigationRef} theme={DarkTheme} {...props}>
      <App.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="login"
      >
        {userStore.isAuthenticated ? (
          <App.Screen name="tabs" component={Tabs} />
        ) : (
          <App.Screen name="login" component={LoginScreen} />
        )}
      </App.Navigator>
    </NavigationContainer>
  )
})

// ---------------- Tabs ----------------

export type TabParams = {
  profilesCarousel
  profilesList
  pairs
  user
}
const Tab = createBottomTabNavigator<TabParams>()

const Tabs = () => (
  <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
    <Tab.Screen
      name="profilesCarousel"
      component={ProfilesCarouselScreen}
      options={{ tabBarIcon: ProfileStackIcon }}
    />
    <Tab.Screen
      name="profilesList"
      component={ProfilesListStack}
      options={{ tabBarIcon: ProfileSearchIcon }}
    />
    <Tab.Screen
      name="pairs"
      component={ProfilesCarouselScreen}
      options={{ tabBarIcon: HeartBalloonsIcon }}
    />
    <Tab.Screen name="user" component={UserMenuScreen} options={{ tabBarIcon: ProfileIcon }} />
  </Tab.Navigator>
)

// ---------------- ProfilesList ----------------
export type ProfilesListParams = {
  profilesListMain
  profileDetails: { profile: TProfile }
}
const ProfilesList = createNativeStackNavigator<ProfilesListParams>()

const ProfilesListStack = () => (
  <ProfilesList.Navigator
    initialRouteName="profilesListMain"
    screenOptions={{ headerShown: false }}
  >
    <ProfilesList.Screen name="profilesListMain" component={ProfilesListScreen} />
    <ProfilesList.Screen name="profileDetails" component={ProfileDetailsScreen} />
  </ProfilesList.Navigator>
)

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
