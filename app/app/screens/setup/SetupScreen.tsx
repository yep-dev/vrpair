import React, { FC, useEffect } from "react"

import { Button, Row } from "native-base"
import { useFormContext } from "react-hook-form"

import { Screen } from "components"
import { storage } from "utils/misc"

type Props = {
  name: string
  heading: string
  handlePrev?(): void
  handleNext(): void
}

const setupScreens = ["profile1", "profile2", "preferences1", "preferences2"]

export const SetupScreen: FC<Props> = ({ name, heading, handlePrev, handleNext, children }) => {
  const {
    watch,
    formState: { isValid },
  } = useFormContext()
  const values = watch()

  useEffect(() => {
    if (Object.entries(values).length) {
      storage.set(name, JSON.stringify({ values, isValid }))
    }
  }, [values, isValid])

  return (
    <Screen
      _contentContainerStyle={{
        justifyContent: "space-between",
        flexGrow: 1,
        mx: 5,
        my: 3,
      }}
      handlePrev={handlePrev}
      heading={heading}
      headingRight={
        <Row>
          {setupScreens.map((screen, i) => (
            <Button
              key={screen}
              _text={{ color: "white" }}
              backgroundColor={screen === name ? "gray.800" : undefined}
              borderRadius={24}
              mx={0.5}
              variant="ghost"
              width="37.3px"
            >
              {i + 1}
            </Button>
          ))}
        </Row>
      }
      scroll
    >
      {children}
      <Row mb={12} space={2}>
        <Button flex={1} size="lg" onPress={handleNext}>
          Next
        </Button>
      </Row>
    </Screen>
  )
}
