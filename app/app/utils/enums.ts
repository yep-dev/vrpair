export type ChoiceEnum = { label: string; color?: string; key: string }
export type ChoiceEnums = Record<string, Record<string, ChoiceEnum>>

export const enumsDefinitions = {
  gender: {
    male: {
      label: "Male",
      color: "blue",
    },
    maleCis: {
      label: "Cis Male",
    },
    maleTrans: {
      label: "Trans Male",
      color: "blue",
    },
    female: {
      label: "Female",
      color: "pink",
    },
    femaleCis: {
      label: "Cis Female",
    },
    femaleTrans: {
      label: "Trans Female",
      color: "pink",
    },
    nonBinary: {
      label: "Non-binary",
      color: "gray",
    },
  },
  setup: {
    quest: {
      label: "Quest Standalone",
    },
    pcvr: {
      label: "PC Half-Body",
    },
    fbt: {
      label: "FBT",
    },
  },
  role: {
    sub: {
      label: "Sub",
      color: "pink",
    },
    dom: {
      label: "Dom",
      color: "blue",
    },
    switch: {
      label: "Switch",
      color: "green",
    },
  },
  mute: {
    true: {
      label: "Mute Only",
    },
    false: {
      label: "Not Mute",
    },
  },
  furry: {
    true: {
      label: "Furry Only",
    },
    false: {
      label: "Not Furry",
    },
  },
  femAvatar: {
    true: {
      label: "Feminine Avatar",
      color: "pink",
    },
    false: {
      label: "Masculine Avatar",
      color: "blue",
    },
    any: {
      label: "Any Gender Avatar",
      color: "green",
    },
  },
}

Object.values(enumsDefinitions).forEach((enum_) => {
  Object.keys(enum_).forEach((key) => {
    enum_[key].key = key
  })
})

// @ts-ignore https://stackoverflow.com/questions/63223715/typescript-type-narrowing-error-with-foreach
export const enums: ChoiceEnums = enumsDefinitions
