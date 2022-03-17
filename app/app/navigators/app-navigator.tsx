import React from "react"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useReduxDevToolsExtension } from "@react-navigation/devtools"
import { NavigationContainer, DarkTheme } from "@react-navigation/native"
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import { ErrorBoundary } from "react-error-boundary"

import { Profile } from "api/index.schemas"
import { useCurrentUser } from "api/users"
import { AvatarIcon, ProfileSearchIcon, ProfileStackIcon } from "components/icons"
import { useStore } from "mobx/utils"
import { LikesIcon } from "navigators/components/LikesIcon"
import { navigationRef, useNavigationPersistence } from "navigators/utils"
import { LikesTabsScreen } from "screens/likes/LikesTabsScreen"
import { LoginScreen } from "screens/LoginScreen"
import { ProfileDetailsScreen } from "screens/profiles/ProfileDetails/ProfileDetailsScreen"
import { ProfilesListScreen } from "screens/profiles/ProfilesListScreen"
import { ProfilesCarouselScreen } from "screens/ProfilesCarouselScreen"
import { Preferences1Screen } from "screens/setup/Preferences1Screen"
import { Preferences2Screen } from "screens/setup/Preferences2Screen"
import { Profile1Screen } from "screens/setup/Profile1Screen"
import { Profile2Screen } from "screens/setup/Profile2Screen"
import { DiscordIntegrationScreen } from "screens/user/DiscordIntegrationScreen"
import { UserMenuScreen } from "screens/user/UserMenu/UserMenuScreen"
import { colors } from "theme/colors"
import { storage } from "utils/misc"

export const NAVIGATION_PERSISTENCE_KEY = "navigationState"

// ---------------- Root ----------------

export type AppParams = {
  login
  tabs
  setup
}
const App = createNativeStackNavigator<AppParams>()

export const AppNavigator = observer(() => {
  const { userStore } = useStore()
  const { data: hasProfile, isLoading } = useCurrentUser({
    query: {
      select: (user) => user.hasProfile,
    },
  })
  useReduxDevToolsExtension(navigationRef)

  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(NAVIGATION_PERSISTENCE_KEY)

  return isNavigationStateRestored && !isLoading ? (
    <ErrorBoundary
      fallback={<></>}
      onError={(error) => {
        if (error.message === "Cannot read property 'props' of undefined") {
          storage.clearAll()
        }
      }}
    >
      <NavigationContainer
        ref={navigationRef}
        initialState={initialNavigationState}
        theme={DarkTheme}
        onStateChange={onNavigationStateChange}
      >
        <App.Navigator
          initialRouteName="login"
          screenOptions={{
            headerShown: false,
          }}
        >
          {userStore.authenticated ? (
            hasProfile || isLoading ? (
              <App.Screen component={Tabs} name="tabs" />
            ) : (
              <App.Screen component={SetupStack} name="setup" />
            )
          ) : (
            <App.Screen component={LoginScreen} name="login" />
          )}
        </App.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  ) : null
})

// ---------------- Setup ----------------
export type SetupParams = {
  profile1
  profile2
  preferences1
  preferences2
}
const Setup = createNativeStackNavigator<SetupParams>()

const SetupStack = () => (
  <Setup.Navigator initialRouteName="profile1" screenOptions={{ headerShown: false }}>
    <Setup.Screen component={Profile1Screen} name="profile1" />
    <Setup.Screen component={Profile2Screen} name="profile2" />
    <Setup.Screen component={Preferences1Screen} name="preferences1" />
    <Setup.Screen component={Preferences2Screen} name="preferences2" />
  </Setup.Navigator>
)

// ---------------- Tabs ----------------

export type TabNavigationProps = NativeStackNavigationProp<TabParams>
export type TabParams = {
  profilesCarousel
  profilesList
  likes
  user
}
const Tab = createBottomTabNavigator<TabParams>()

const Tabs = () => (
  <Tab.Navigator
    initialRouteName="profilesCarousel"
    screenOptions={{
      tabBarShowLabel: false,
      headerShown: false,
      tabBarActiveTintColor: colors.blue[500],
      tabBarInactiveTintColor: colors.gray[500],
    }}
  >
    <Tab.Screen
      component={ProfilesCarouselScreen}
      name="profilesCarousel"
      options={{ tabBarIcon: ({ color }) => <ProfileStackIcon color={color} /> }}
    />
    <Tab.Screen
      component={ProfilesListStack}
      listeners={({ navigation }) => ({
        blur: () => navigation.setParams({ screen: "profilesListMain" }),
      })}
      name="profilesList"
      options={{
        tabBarIcon: ({ color }) => <ProfileSearchIcon color={color} />,
      }}
    />
    <Tab.Screen
      component={LikesStack}
      listeners={({ navigation }) => ({
        blur: () => navigation.setParams({ screen: "likesTabs" }),
      })}
      name="likes"
      options={{ tabBarIcon: ({ color }) => <LikesIcon color={color} /> }}
    />
    <Tab.Screen
      component={UsersStack}
      listeners={({ navigation }) => ({
        blur: () => navigation.setParams({ screen: "userMenu" }),
      })}
      name="user"
      options={{ tabBarIcon: ({ color }) => <AvatarIcon color={color} /> }}
    />
  </Tab.Navigator>
)

// ---------------- ProfilesList ----------------
export type ProfilesListParams = {
  profilesListMain
  profileDetails: { profile: Profile; liked?: boolean; likes?: boolean }
}
const ProfilesList = createNativeStackNavigator<ProfilesListParams>()

const ProfilesListStack = () => (
  <ProfilesList.Navigator
    initialRouteName="profilesListMain"
    screenOptions={{ headerShown: false }}
  >
    <ProfilesList.Screen component={ProfilesListScreen} name="profilesListMain" />
    <ProfilesList.Screen component={ProfileDetailsScreen} name="profileDetails" />
  </ProfilesList.Navigator>
)

// ---------------- Likes ----------------
export type LikesParams = {
  likesTabs
  profileDetails: { profile: Profile }
}
const Likes = createNativeStackNavigator<LikesParams>()

const LikesStack = () => (
  <Likes.Navigator initialRouteName="likesTabs" screenOptions={{ headerShown: false }}>
    <Likes.Screen component={LikesTabsScreen} name="likesTabs" />
    <Likes.Screen component={ProfileDetailsScreen} name="profileDetails" />
  </Likes.Navigator>
)

// ---------------- User ----------------
export type UserParams = {
  userMenu
  discordIntegration
}
const User = createNativeStackNavigator<UserParams>()

const UsersStack = () => (
  <User.Navigator initialRouteName="userMenu" screenOptions={{ headerShown: false }}>
    <User.Screen component={UserMenuScreen} name="userMenu" />
    <User.Screen component={DiscordIntegrationScreen} name="discordIntegration" />
  </User.Navigator>
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
