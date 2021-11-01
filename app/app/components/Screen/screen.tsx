import { Box, IBoxProps, KeyboardAvoidingView, ScrollView, StatusBar, View } from "native-base"
import * as React from "react"
import { Platform, StyleProp, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const isIos = Platform.OS === "ios"

export interface ScreenProps extends IBoxProps {
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
      <View style={insetStyle} bg="gray.900">
        {props.scroll ? (
          <ScrollView
            keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || "handled"}
            style={{ flex: 1 }}
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
