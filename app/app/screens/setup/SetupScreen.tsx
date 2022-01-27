import React, { FC, useEffect } from "react"

import { Button, Column, Row } from "native-base"
import { useFormContext } from "react-hook-form"

import { Screen } from "components"
import { storage } from "utils/misc"

type Props = {
  name: string
  heading: string
  routeKey: string
  handlePrev?(): void
  handleNext(): void
}
export const SetupScreen: FC<Props> = ({
  name,
  heading,
  routeKey,
  handlePrev,
  handleNext,
  children,
}) => {
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
      heading={heading}
      handlePrev={handlePrev}
      scroll
      headingRight={
        <Row>
          {["1", "2", "3", "4"].map((key) => (
            <Button
              borderRadius={24}
              variant="ghost"
              key={key}
              width="37.3px"
              mx={0.5}
              _text={{ color: "white" }}
              backgroundColor={key === routeKey ? "gray.800" : undefined}
            >
              {key}
            </Button>
          ))}
        </Row>
      }
    >
      <Column space={6}>{children}</Column>
      <Row mb={12} space={2}>
        <Button onPress={handleNext} flex={1} size="lg">
          Next
        </Button>
      </Row>
    </Screen>
  )
}
