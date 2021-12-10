import React from "react"

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function inject<TProps, TInjectedKeys extends keyof TProps>(
  Component: React.JSXElementConstructor<TProps>,
  injected: Pick<TProps, TInjectedKeys>,
) {
  return function Injected(props: Omit<TProps, TInjectedKeys>) {
    return <Component {...(props as TProps)} {...injected} />
  }
}
