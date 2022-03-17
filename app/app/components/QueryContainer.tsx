import React, { FC } from "react"

import { Box, Center, Text } from "native-base"
import { UseQueryResult } from "react-query"

import { SmileyUnhappy } from "components/icons"
import { colors } from "theme/colors"

type Props = {
  query: UseQueryResult<any>
  text: string
}

export const QueryContainer: FC<Props> = ({ children, query, text }) => (
  <Box flex={1}>
    {query?.data?.results &&
      (query.data.results.length ? (
        children
      ) : (
        <Center flex={1}>
          <SmileyUnhappy color={colors.gray["50"]} size={16} />
          <Text mt={4}>{text}</Text>
        </Center>
      ))}
  </Box>
)
