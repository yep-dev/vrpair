import { Clients } from "api/apiClients"

export type Profile = {
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

  // custom
  likes?: boolean
  liked?: boolean
  paired?: boolean
  date?: string
}

export type ProfileDetails = {
  preferences: Preferences
} & Profile

export type Preferences = {
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

export type ProfileListResult = {
  results: Profile[]
}

type Props = {
  signal?: AbortSignal
}

export const profilesKeys = {
  profileList: ["profiles", "profileList"],
  currentProfile: ["profiles", "currentProfile"],
}

export const profilesApi = ({ client }: Clients) => ({
  profileList: async ({ signal }: Props): Promise<ProfileListResult> =>
    await client
      .get("profiles/profile-list", {
        signal,
      })
      .json(),

  currentProfile: async ({ signal }: Props): Promise<Profile> =>
    await client
      .get("profiles/current-profile", {
        signal,
      })
      .json(),

  createProfile: async (json: ProfileForm): Promise<Profile> =>
    await client
      .post("profiles/create-profile", {
        json,
      })
      .json(),
})
