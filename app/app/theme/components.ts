import base from "native-base/src/theme/components"

export const components = {
  ...base,
  Heading: {
    ...base.Heading,
    baseStyle: (props: Record<string, any>) => {
      return {
        fontFamily: "heading",
        lineHeight: "sm",
      }
    },
  },
}
