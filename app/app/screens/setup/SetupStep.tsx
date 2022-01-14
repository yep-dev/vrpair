import React, { FC } from "react"

import { Box, Button, ScrollView, View } from "native-base"

type Props = {
  handleNext(): void
}

export const SetupStep: FC<Props> = ({ children, handleNext }) => (
  <ScrollView _contentContainerStyle={{ justifyContent: "space-between", flexGrow: 1, margin: 6 }}>
    <View>{children}</View>
    <Box justifyContent="flex-end" mb={12}>
      <Button onPress={handleNext}>Next</Button>
    </Box>
  </ScrollView>
)
