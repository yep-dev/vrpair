import "./utils/ignore-warnings"
import React, { useState, useEffect } from "react"

import { NativeBaseProvider } from "native-base"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import { QueryClient, QueryClientProvider } from "react-query"

import { ClientProvider } from "apiClient/ClientProvider"
import { RootStore, RootStoreContext } from "mobx/root-store"
import { setupRootStore } from "mobx/setup-root-store"
import { AppNavigator, canExit } from "navigators/app-navigator"
import { useBackButtonHandler } from "navigators/utils"
import { theme } from "theme"

const queryClient = new QueryClient()

export const App = () => {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  useBackButtonHandler(canExit)

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
  if (!rootStore) return null

  return (
    <RootStoreContext.Provider value={rootStore}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <NativeBaseProvider config={{ suppressColorAccessibilityWarning: true }} theme={theme}>
          <QueryClientProvider client={queryClient}>
            <ClientProvider>
              <AppNavigator />
            </ClientProvider>
          </QueryClientProvider>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </RootStoreContext.Provider>
  )
}
