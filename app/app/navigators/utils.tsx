import { useEffect, useRef, useState } from "react"
import { BackHandler } from "react-native"

import {
  createNavigationContainerRef,
  NavigationAction,
  NavigationState,
  PartialState,
} from "@react-navigation/native"

import { storage } from "utils/misc"

/* eslint-disable */
export const RootNavigation = {
  navigate(_name: string, _params?: any) {},
  goBack() {},
  resetRoot(_state?: PartialState<NavigationState> | NavigationState) {},
  getRootState(): NavigationState {
    return {} as any
  },
  dispatch(_action: NavigationAction) {},
}
/* eslint-enable */

export const navigationRef = createNavigationContainerRef()

/**
 * Gets the current screen from any navigation state.
 */
export const getActiveRouteName = (state: NavigationState | PartialState<NavigationState>) => {
  // @ts-ignore
  const route = state.routes[state.index]

  // Found the active route -- return the name
  if (!route.state) return route.name

  // Recursive call to deal with nested routers
  return getActiveRouteName(route.state)
}

/**
 * Hook that handles Android back button presses and forwards those on to
 * the navigation or allows exiting the app.
 */
export const useBackButtonHandler = (canExit: (routeName: string) => boolean) => {
  const canExitRef = useRef(canExit)

  useEffect(() => {
    canExitRef.current = canExit
  }, [canExit])

  useEffect(() => {
    // We'll fire this when the back button is pressed on Android.
    const onBackPress = () => {
      if (!navigationRef.isReady()) {
        return false
      }

      // grab the current route
      const routeName = getActiveRouteName(navigationRef.getRootState())

      // are we allowed to exit?
      if (canExitRef.current(routeName)) {
        // let the system know we've not handled this event
        return false
      }

      // we can't exit, so let's turn this into a back action
      if (navigationRef.canGoBack()) {
        navigationRef.goBack()
        return true
      }

      return false
    }

    // Subscribe when we come to life
    BackHandler.addEventListener("hardwareBackPress", onBackPress)

    // Unsubscribe when we're done
    return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress)
  }, [])
}

/**
 * Custom hook for persisting navigation state.
 */
export const useNavigationPersistence = (persistenceKey: string) => {
  const [initialNavigationState, setInitialNavigationState] = useState()
  const [isRestored, setIsRestored] = useState(!__DEV__)
  const routeNameRef = useRef<string | undefined>()

  const onNavigationStateChange = (state) => {
    if (__DEV__) {
      routeNameRef.current = getActiveRouteName(state)
      storage.setObj(persistenceKey, state)
    }
  }

  const restoreState = async () => {
    try {
      const state = storage.getObj(persistenceKey)
      if (state && Object.keys(state).length !== 0) setInitialNavigationState(state)
    } finally {
      setIsRestored(true)
    }
  }

  useEffect(() => {
    if (!isRestored) restoreState()
  }, [isRestored])

  return { onNavigationStateChange, restoreState, isRestored, initialNavigationState }
}

/**
 * use this to navigate to navigate without the navigation
 * prop. If you have access to the navigation prop, do not use this.
 * More info: https://reactnavigation.org/docs/navigating-without-navigation-prop/
 */
export const navigate = (name: any, params?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never)
  }
}

export const goBack = () => {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack()
  }
}

export const resetRoot = (params = { index: 0, routes: [] }) => {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(params)
  }
}
