import { KyInstance } from "ky/distribution/types/ky"

import { TProfile } from "api/profiles"

type Props = {
  signal?: AbortSignal
}

export type TProfileAndDate = {
  date: Date
  profile: TProfile
}

type TResponse = {
  results: TProfileAndDate[]
}
export const likesApi = ({ client }: { client: KyInstance }) => ({
  likeProfile: async ({ profileId }): Promise<{}> =>
    await client.post("likes/like-profile", {
      json: { profileId },
    }),
  skipProfile: async ({ profileId }): Promise<{}> =>
    await client.post("likes/skip-profile", {
      json: { profileId },
    }),
  likedProfileList: async ({ signal }: Props): Promise<TResponse> =>
    await client.get("likes/liked-profile-list", { signal }).json(),
  likesList: async ({ signal }: Props): Promise<TResponse> =>
    await client.get("likes/likes-list", { signal }).json(),
  pairsList: async ({ signal }: Props): Promise<TResponse> =>
    await client.get("likes/pairs-list", { signal }).json(),
})
