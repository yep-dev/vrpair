import React from "react"

import { transparentize } from "native-base/src/theme/tools"

import { theme } from "theme"

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const inject = <TProps, TInjectedKeys extends keyof TProps>(
  Component: React.JSXElementConstructor<TProps>,
  injected: Pick<TProps, TInjectedKeys>,
) => {
  const Injected = (props: Omit<TProps, TInjectedKeys>) => {
    return <Component {...(props as TProps)} {...injected} />
  }
  return Injected
}

export const pressedBackground = (colorScheme) => transparentize(`${colorScheme}.500`, 0.6)(theme)

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
export const atob = (input = "") => {
  const str = input.replace(/=+$/, "")
  let output = ""

  if (str.length % 4 === 1) {
    throw new Error("'atob' failed: The string to be decoded is not correctly encoded.")
  }
  for (
    let bc = 0, bs = 0, buffer, i = 0;
    (buffer = str.charAt(i++));
    ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0
  ) {
    buffer = chars.indexOf(buffer)
  }

  return output
}
