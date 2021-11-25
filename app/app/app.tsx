import "./utils/ignore-warnings"
import { ApiProvider } from "api/apiProvider"
import theme from "./theme"
import React, { useState, useEffect } from "react"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import * as storage from "utils/storage"
import { AppNavigator, canExit } from "navigators/app-navigator"
import { useBackButtonHandler, useNavigationPersistence } from "navigators/utils"
import { setupRootStore } from "mobx/setup-root-store"
import { RootStore, RootStoreContext } from "mobx/root-store"
import { NativeBaseProvider } from "native-base"
import { QueryClient, QueryClientProvider } from "react-query"

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

const queryClient = new QueryClient()

function App() {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  useBackButtonHandler(canExit)
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  useEffect(() => {
    ;(async () => {
      setupRootStore().then(setRootStore)
    })()
  }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!rootStore || !isNavigationStateRestored) return null

  return (
    <RootStoreContext.Provider value={rootStore}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <NativeBaseProvider theme={theme} config={{ suppressColorAccessibilityWarning: true }}>
          <QueryClientProvider client={queryClient}>
            <ApiProvider>
              <AppNavigator
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />
            </ApiProvider>
          </QueryClientProvider>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </RootStoreContext.Provider>
  )
}

export default App
