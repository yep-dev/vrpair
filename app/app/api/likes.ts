import { Clients } from "api/apiClients"
import { Profile } from "api/profiles"

type Props = {
  signal?: AbortSignal
}

export type LikesResponse = {
  results: Profile[]
}

export type Badges = {
  pairs?: number
  likes?: number
}

export const likesKeys = {
  likedList: ["likes", "likedList"],
  likesList: ["likes", "likesList"],
  pairsList: ["likes", "pairsList"],
  badges: ["likes", "badges"],
}

export const likesApi = ({ client }: Clients) => ({
  rateProfile: async (json: { profileId: number; liked: boolean }): Promise<{}> =>
    await client.post("likes/rate-profile", {
      json,
    }),

  likedList: async ({ signal }: Props): Promise<LikesResponse> =>
    await client.get("likes/liked-list", { signal }).json(),

  likesList: async ({ signal }: Props): Promise<LikesResponse & { likesBadge: number }> =>
    await client.get("likes/likes-list", { signal }).json(),

  pairsList: async ({ signal }: Props): Promise<LikesResponse & { pairsBadge: number }> =>
    await client.get("likes/pair-list", { signal }).json(),
})
