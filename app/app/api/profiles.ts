import { KyInstance } from "ky/distribution/types/ky"

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

export type TProfileListResult = {
  results: TProfile[]
}

type Props = {
  signal?: AbortSignal
}

export const profilesApi = ({ client }: { client: KyInstance }) => ({
  profileList: async ({ signal }: Props): Promise<TProfileListResult> =>
    await client
      .get("profiles/profile-list", {
        signal,
      })
      .json(),
})
