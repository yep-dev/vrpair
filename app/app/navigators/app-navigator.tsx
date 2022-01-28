import React from "react"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useReduxDevToolsExtension } from "@react-navigation/devtools"
import { NavigationContainer, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import { useQuery } from "react-query"

import { useApi } from "api/apiProvider"
import { TProfile } from "api/profiles"
import { ProfileIcon, ProfileSearchIcon, ProfileStackIcon } from "components/icons"
import { useStore } from "mobx/utils"
import { LikesIcon } from "navigators/components/LikesIcon"
import { navigationRef, useNavigationPersistence } from "navigators/utils"
import { LikesTabsScreen } from "screens/likes/LikesTabsScreen"
import { LoginScreen } from "screens/LoginScreen"
import { ProfileDetailsScreen } from "screens/profiles/ProfileDetailsScreen"
import { ProfilesListScreen } from "screens/profiles/ProfilesListScreen"
import { ProfilesCarouselScreen } from "screens/ProfilesCarouselScreen"
import { Preferences1Screen } from "screens/setup/Preferences1Screen"
import { Preferences2Screen } from "screens/setup/Preferences2Screen"
import { Profile1Screen } from "screens/setup/Profile1Screen"
import { Profile2Screen } from "screens/setup/Profile2Screen"
import { DiscordIntegrationScreen } from "screens/user/DiscordIntegrationScreen"
import { UserMenuScreen } from "screens/user/UserMenu/UserMenuScreen"
import { colors } from "theme/colors"

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
  const api = useApi()
  const { data: hasProfile, isLoading } = useQuery("currentUser", api.users.currentUser, {
    select: (user) => user.hasProfile,
  })
  useReduxDevToolsExtension(navigationRef)

  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(NAVIGATION_PERSISTENCE_KEY)

  return isNavigationStateRestored && !isLoading ? (
    <NavigationContainer
      ref={navigationRef}
      theme={DarkTheme}
      initialState={initialNavigationState}
      onStateChange={onNavigationStateChange}
    >
      <App.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="login"
      >
        {userStore.authenticated ? (
          hasProfile || isLoading ? (
            <App.Screen name="tabs" component={Tabs} />
          ) : (
            <App.Screen name="setup" component={SetupStack} />
          )
        ) : (
          <App.Screen name="login" component={LoginScreen} />
        )}
      </App.Navigator>
    </NavigationContainer>
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
    <Setup.Screen name="profile1" component={Profile1Screen} />
    <Setup.Screen name="profile2" component={Profile2Screen} />
    <Setup.Screen name="preferences1" component={Preferences1Screen} />
    <Setup.Screen name="preferences2" component={Preferences2Screen} />
  </Setup.Navigator>
)

// ---------------- Tabs ----------------

export type TabParams = {
  profilesCarousel
  profilesList
  likes
  user
}
const Tab = createBottomTabNavigator<TabParams>()

// fix for https://github.com/react-navigation/react-navigation/issues/6915
const tabProps = {
  listeners: ({ navigation }) => ({ blur: () => navigation.setParams({ screen: undefined }) }),
}

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
      name="profilesCarousel"
      component={ProfilesCarouselScreen}
      options={{ tabBarIcon: ({ color }) => <ProfileStackIcon color={color} /> }}
    />
    <Tab.Screen
      name="profilesList"
      component={ProfilesListStack}
      options={{
        tabBarIcon: ({ color }) => <ProfileSearchIcon color={color} />,
        unmountOnBlur: true,
      }}
      {...tabProps}
    />
    <Tab.Screen
      name="likes"
      component={LikesStack}
      options={{ tabBarIcon: ({ color }) => <LikesIcon color={color} />, unmountOnBlur: true }}
      {...tabProps}
    />
    <Tab.Screen
      name="user"
      component={UsersStack}
      options={{ tabBarIcon: ({ color }) => <ProfileIcon color={color} />, unmountOnBlur: true }}
      {...tabProps}
    />
  </Tab.Navigator>
)

// ---------------- ProfilesList ----------------
export type ProfilesListParams = {
  profilesListMain
  profileDetails: { profile: TProfile; liked?: boolean; skipped?: boolean }
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

// ---------------- Likes ----------------
export type LikesParams = {
  likesTabs
  profileDetails: { profile: TProfile; liked?: boolean; skipped?: boolean }
}
const Likes = createNativeStackNavigator<LikesParams>()

const LikesStack = () => (
  <Likes.Navigator initialRouteName="likesTabs" screenOptions={{ headerShown: false }}>
    <Likes.Screen name="likesTabs" component={LikesTabsScreen} />
    <Likes.Screen name="profileDetails" component={ProfileDetailsScreen} />
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
    <User.Screen name="userMenu" component={UserMenuScreen} />
    <User.Screen name="discordIntegration" component={DiscordIntegrationScreen} />
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
