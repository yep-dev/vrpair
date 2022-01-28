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
      label: "Non-Binary",
      color: "gray",
    },
  },
  setup: {
    quest: {
      label: "Quest",
    },
    pcvr: {
      label: "PC Half-Body",
    },
    fbt: {
      label: "Full-Body",
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
    any: {
      label: "No Preference",
    },
    false: {
      label: "Not Mute",
    },
    true: {
      label: "Mute Only",
    },
  },
  furry: {
    any: {
      label: "No Preference",
    },
    false: {
      label: "Not Furry",
    },
    true: {
      label: "Furry Only",
    },
  },
  femAvatar: {
    true: {
      label: "Feminine",
      color: "pink",
    },
    false: {
      label: "Masculine",
      color: "blue",
    },
    any: {
      label: "Any",
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
