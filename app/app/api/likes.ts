import { TClients } from "api/apiClients"
import { TProfile } from "api/profiles"

type Props = {
  signal?: AbortSignal
}

export type TLikesResponse = {
  results: TProfile[]
}

export type TBadges = {
  pairs?: number
  likes?: number
}

export const likesApi = ({ client }: TClients) => ({
  rateProfile: async (json: { profileId: number; liked: boolean }): Promise<{}> =>
    await client.post("likes/rate-profile", {
      json,
    }),

  likedList: async ({ signal }: Props): Promise<TLikesResponse> =>
    await client.get("likes/liked-list", { signal }).json(),

  likesList: async ({ signal }: Props): Promise<TLikesResponse & { likesBadge: number }> =>
    await client.get("likes/likes-list", { signal }).json(),

  pairsList: async ({ signal }: Props): Promise<TLikesResponse & { pairsBadge: number }> =>
    await client.get("likes/pair-list", { signal }).json(),
})
