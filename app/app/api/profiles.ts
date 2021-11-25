import { GenderValues } from "utils/enums"

type Profile = {
  id: number
  gender: GenderValues
  username: string
}

export type ProfileListResult = {
  results: Profile[]
}

type Props = {
  signal?: AbortSignal
}

export const profilesApi = (client) => ({
  profileList: async ({ signal }: Props): Promise<ProfileListResult> =>
    await client
      .get("profiles/profile-list", {
        signal,
      })
      .json(),
})
