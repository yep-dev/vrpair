import { TClients } from "api/apiClients"
import { TProfile } from "api/profiles"

type Props = {
  signal?: AbortSignal
}

export type TProfileAndDate = {
  id: number
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

export const likesApi = ({ client }: TClients) => ({
  likeProfile: async (json: { profileId: number }): Promise<{}> =>
    await client.post("likes/like-profile", {
      json,
    }),

  skipProfile: async (json: { profileId: number }): Promise<{}> =>
    await client.post("likes/skip-profile", {
      json,
    }),

  likedProfileList: async ({ signal }: Props): Promise<TLikesResponse> =>
    await client.get("likes/liked-profile-list", { signal }).json(),

  likesList: async ({ signal }: Props): Promise<TLikesResponse & { likesBadge: number }> =>
    await client.get("likes/like-list", { signal }).json(),

  pairsList: async ({ signal }: Props): Promise<TLikesResponse & { pairsBadge: number }> =>
    await client.get("likes/pair-list", { signal }).json(),
})
