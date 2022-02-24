export type Badges = {
  pairs?: number
  likes?: number
}
export const badgesQueryKey = "badges"

export const getRateProfileQueryKey = (profileId) => ["/likes/rate-profile", profileId]
