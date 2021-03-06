import React, { FC, ReactNode } from "react"
import { Platform, StyleProp, ViewStyle } from "react-native"

import { useNavigation } from "@react-navigation/native"
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

import { ArrowLeftIcon } from "components/icons"

const isIos = Platform.OS === "ios"

type Props = {
  unsafe?: boolean
  statusBar?: "light-content" | "dark-content"
  handlePrev?: (() => void) | boolean
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
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const insetStyle = { paddingTop: unsafe ? 0 : insets.top }

  return (
    <KeyboardAvoidingView behavior={isIos ? "padding" : undefined} flex={1}>
      <StatusBar barStyle={statusBar || "light-content"} />
      <View bg="gray.900" flex={1} style={insetStyle}>
        {heading && (
          <Row alignItems="center" height={10} mb={1} ml={2} mr={5} space={2}>
            {handlePrev && (
              <IconButton
                icon={<ArrowLeftIcon color="primary.500" size={4} />}
                size="lg"
                variant="ghost"
                onPress={typeof handlePrev === "function" ? handlePrev : () => navigation.goBack()}
              />
            )}
            <Heading flex={1} ml={!handlePrev ? 2 : 0} mt={0.5}>
              {heading}
            </Heading>
            {headingRight}
          </Row>
        )}
        {scroll ? (
          <ScrollView
            flex={1}
            {...props}
            _contentContainerStyle={{ pt: 3, pb: 16, flexGrow: 1, ...props._contentContainerStyle }}
          >
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
