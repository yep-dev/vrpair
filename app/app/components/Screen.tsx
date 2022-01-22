import React from "react"
import { Platform, StyleProp, ViewStyle } from "react-native"

import {
  Box,
  IBoxProps,
  IScrollViewProps,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  View,
} from "native-base"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const isIos = Platform.OS === "ios"

type Props = {
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
  backgroundColor?: string
  statusBar?: "light-content" | "dark-content"
  unsafe?: boolean
  keyboardShouldPersistTaps?: "handled" | "always" | "never"
  scroll?: boolean
  scrollProps?: IScrollViewProps
} & IBoxProps

export const Screen = (props: Props) => {
  const insets = useSafeAreaInsets()
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top, flex: 1 }

  return (
    <KeyboardAvoidingView behavior={isIos ? "padding" : undefined} style={{ flex: 1 }}>
      <StatusBar barStyle={props.statusBar || "light-content"} />
      <View style={insetStyle} bg="gray.900">
        {props.scroll ? (
          <ScrollView
            keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || "handled"}
            style={{ flex: 1 }}
            {...props.scrollProps}
          >
            <Box style={{ flex: 1 }} {...props}>
              {props.children}
            </Box>
          </ScrollView>
        ) : (
          <Box style={{ flex: 1 }} {...props}>
            {props.children}
          </Box>
        )}
      </View>
    </KeyboardAvoidingView>
  )
}
