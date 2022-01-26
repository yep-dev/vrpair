import React, { FC, ReactNode } from "react"
import { Platform, StyleProp, ViewStyle } from "react-native"

import {
  Box,
  Heading,
  IconButton,
  IScrollViewProps,
  KeyboardAvoidingView,
  Row,
  ScrollView,
  StatusBar,
  View,
} from "native-base"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { ArrowLeftIcon } from "components/icons/ArrowLeftIcon"

const isIos = Platform.OS === "ios"

type Props = {
  unsafe?: boolean
  statusBar?: "light-content" | "dark-content"
  handlePrev?(): void
  heading?: string
  headingRight?: ReactNode
  scroll?: boolean
  scrollProps?: IScrollViewProps
  style?: StyleProp<ViewStyle>
  backgroundColor?: string
} & IScrollViewProps

export const Screen: FC<Props> = ({
  unsafe,
  statusBar,
  handlePrev,
  heading,
  headingRight,
  scroll,
  children,
  ...props
}) => {
  const insets = useSafeAreaInsets()
  const insetStyle = { paddingTop: unsafe ? 0 : insets.top }
  return (
    <KeyboardAvoidingView behavior={isIos ? "padding" : undefined} flex={1}>
      <StatusBar barStyle={statusBar || "light-content"} />
      <View style={insetStyle} flex={1} bg="gray.900">
        {heading && (
          <Row space={2} alignItems="center" ml={2} mr={5}>
            {handlePrev && (
              <IconButton
                icon={<ArrowLeftIcon color="primary.500" />}
                onPress={handlePrev}
                size="lg"
                variant="ghost"
              />
            )}
            <Heading mt={1} flex={1}>
              {heading}
            </Heading>
            {headingRight}
          </Row>
        )}
        {scroll ? (
          <ScrollView flex={1} {...props}>
            {children}
          </ScrollView>
        ) : (
          <Box flex={1} {...props}>
            {children}
          </Box>
        )}
      </View>
    </KeyboardAvoidingView>
  )
}
