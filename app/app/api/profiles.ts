import { KyInstance } from "ky/distribution/types/ky"

export type Profile = {
  // 1
  id: number
  username: number
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
  preferences: Preferences
}

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

export type ProfileListResult = {
  results: Profile[]
}

type Props = {
  signal?: AbortSignal
}

export const profilesApi = ({ client }: { client: KyInstance }) => ({
  profileList: async ({ signal }: Props): Promise<ProfileListResult> =>
    await client
      .get("profiles/profile-list", {
        signal,
      })
      .json(),
})
