import { KyInstance } from "ky/distribution/types/ky"

export const usersApi = ({ baseClient }: { baseClient: KyInstance }) => ({
  tokenRefresh: async ({
    refreshToken,
  }: {
    refreshToken: string
  }): Promise<{ access: string } | null> =>
    await baseClient.post("users/token-refresh", { json: { refresh: refreshToken } }).json(),
})
