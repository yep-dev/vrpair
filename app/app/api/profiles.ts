import { TClients } from "api/apiClients"

export type TProfile = {
  // 1
  id: number
  username: string
  age: number
  gender: string
  femAvatar: boolean
  // 2
  setup: string
  role: string
  mute: boolean
  furry: boolean

  // other
  startHour: string
  endHour: string
  weekDays: string
  description: string
  verified: boolean
  preferences: TPreferences
}

export type TPreferences = {
  // 3
  gender: string[]
  femAvatar: string
  ageMin: number
  ageMax: number
  // 4
  setup: string[]
  role: string[]
  mute: string
  furry: string
}

export type ProfileForm = {
  // 1
  birthMonth: string
  birthYear: string
  femAvatar: string
  gender: string
  trans: boolean
  username: string
  // 2
  furry: boolean
  mute: boolean
  role: string
  setup: string

  preferences: PreferencesForm
}

export type PreferencesForm = {
  // 1
  ageMax: number
  ageMin: number
  femAvatar: string
  gender: string[]
  // 2
  furry: string
  mute: string
  role: string[]
  setup: string[]
}

export type TProfileListResult = {
  results: TProfile[]
}

type Props = {
  signal?: AbortSignal
}

export const profilesApi = ({ client }: TClients) => ({
  profileList: async ({ signal }: Props): Promise<TProfileListResult> =>
    await client
      .get("profiles/profile-list", {
        signal,
      })
      .json(),

  currentProfile: async ({ signal }: Props): Promise<TProfile> =>
    await client
      .get("profiles/current-profile", {
        signal,
      })
      .json(),

  createProfile: async (json: ProfileForm): Promise<{}> =>
    await client
      .post("profiles/create-profile", {
        json,
      })
      .json(),
})
