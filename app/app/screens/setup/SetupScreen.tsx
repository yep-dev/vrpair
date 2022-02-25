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
      handlePrev={handlePrev}
      heading={heading}
      headingRight={
        <Row>
          {["1", "2", "3", "4"].map((key) => (
            <Button
              key={key}
              _text={{ color: "white" }}
              backgroundColor={key === routeKey ? "gray.800" : undefined}
              borderRadius={24}
              mx={0.5}
              variant="ghost"
              width="37.3px"
            >
              {key}
            </Button>
          ))}
        </Row>
      }
      scroll
    >
      <Column space={6}>{children}</Column>
      <Row mb={12} space={2}>
        <Button flex={1} size="lg" onPress={handleNext}>
          Next
        </Button>
      </Row>
    </Screen>
  )
}
