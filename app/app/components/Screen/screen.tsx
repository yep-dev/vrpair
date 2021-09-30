import * as React from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleProp,
  View,
  ViewStyle,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const isIos = Platform.OS === "ios"

export interface ScreenProps {
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
  backgroundColor?: string
  statusBar?: "light-content" | "dark-content"
  unsafe?: boolean
  keyboardShouldPersistTaps?: "handled" | "always" | "never"
  scroll?: boolean
}

export const Screen = (props: ScreenProps) => {
  const insets = useSafeAreaInsets()
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top, flex: 1 }

  return (
    <KeyboardAvoidingView behavior={isIos ? "padding" : undefined} style={{ flex: 1 }}>
      <StatusBar barStyle={props.statusBar || "light-content"} />
      <View style={insetStyle}>
        {props.scroll ? (
          <ScrollView
            keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || "handled"}
            style={{ flex: 1 }}
          >
            {props.children}
          </ScrollView>
        ) : (
          props.children
        )}
      </View>
    </KeyboardAvoidingView>
  )
}
