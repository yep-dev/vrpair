import React from "react"

import { transparentize } from "native-base/src/theme/tools"

import { theme } from "theme"

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function inject<TProps, TInjectedKeys extends keyof TProps>(
  Component: React.JSXElementConstructor<TProps>,
  injected: Pick<TProps, TInjectedKeys>,
) {
  return function Injected(props: Omit<TProps, TInjectedKeys>) {
    return <Component {...(props as TProps)} {...injected} />
  }
}

export const pressedBackground = (colorScheme) => transparentize(`${colorScheme}.500`, 0.6)(theme)
