import * as React from "react"
// eslint-disable-next-line no-restricted-imports
import { ScrollView, View, ViewStyle } from "react-native"

export interface StoryProps {
  children?: React.ReactNode
}

const ROOT: ViewStyle = { flex: 1 }

export function Story(props: StoryProps) {
  return (
    <View style={ROOT}>
      <ScrollView keyboardShouldPersistTaps="handled">{props.children}</ScrollView>
    </View>
  )
}
