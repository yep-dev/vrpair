import React, { FC, useEffect } from "react"

import {
  Button,
  Heading,
  IconButton,
  KeyboardAvoidingView,
  Row,
  ScrollView,
  View,
} from "native-base"
import { useFormContext } from "react-hook-form"

import { ArrowLeftIcon } from "components/icons/ArrowLeftIcon"
import { storage } from "utils/misc"

type Props = {
  name: string
  heading: string
  handlePrev?(): void
  handleNext(): void
}

export const SetupStep: FC<Props> = ({ name, heading, handlePrev, handleNext, children }) => {
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
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        _contentContainerStyle={{
          justifyContent: "space-between",
          flexGrow: 1,
          mx: 6,
          my: 3,
        }}
      >
        <View>
          <Row space={2} alignItems="center" mb={2}>
            {handlePrev && (
              <IconButton
                icon={<ArrowLeftIcon color="primary.500" />}
                onPress={handlePrev}
                size="lg"
                variant="ghost"
                mb={1}
              />
            )}
            <Heading>{heading}</Heading>
          </Row>
          {children}
        </View>
        <Row mb={12} space={2}>
          <Button onPress={handleNext} flex={3} size="lg">
            Next
          </Button>
        </Row>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
