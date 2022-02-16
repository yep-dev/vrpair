import React, { FC } from "react"

import { Box, Center, Text } from "native-base"
import { UseQueryResult } from "react-query"

import { LikesResponse } from "apiClient/likes"
import { SmileyUnhappy } from "components/icons"

type Props = {
  query: UseQueryResult<LikesResponse>
  text: string
}

export const QueryContainer: FC<Props> = ({ children, query, text }) => (
  <Box flex={1}>
    {query?.data?.results &&
      (query.data.results.length ? (
        children
      ) : (
        <Center flex={1}>
          <SmileyUnhappy />
          <Text mt={4}>{text}</Text>
        </Center>
      ))}
  </Box>
)
