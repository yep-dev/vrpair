import React, { FC } from "react"

import { Box, Button, KeyboardAvoidingView, ScrollView, View } from "native-base"

type Props = {
  handleNext(): void
}

export const SetupStep: FC<Props> = ({ children, handleNext }) => (
  <KeyboardAvoidingView style={{ flex: 1 }}>
    <ScrollView
      _contentContainerStyle={{ justifyContent: "space-between", flexGrow: 1, margin: 6 }}
    >
      <View>{children}</View>
      <Box justifyContent="flex-end" mb={12}>
        <Button onPress={handleNext} size="lg">
          Next
        </Button>
      </Box>
    </ScrollView>
  </KeyboardAvoidingView>
)
