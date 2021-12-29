import { KyInstance } from "ky/distribution/types/ky"

import { TProfile } from "api/profiles"

type Props = {
  signal?: AbortSignal
}

export type TProfileAndDate = {
  date: string
  profile: TProfile
}

export type TLikesResponse = {
  results: TProfileAndDate[]
}

export type TBadges = {
  pairs?: number
  likes?: number
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

  likedProfileList: async ({ signal }: Props): Promise<TLikesResponse> =>
    await client.get("likes/liked-profile-list", { signal }).json(),

  likesList: async ({ signal }: Props): Promise<TLikesResponse & { likesBadge: number }> =>
    await client.get("likes/like-list", { signal }).json(),

  pairsList: async ({ signal }: Props): Promise<TLikesResponse & { pairsBadge: number }> =>
    await client.get("likes/pair-list", { signal }).json(),
})
