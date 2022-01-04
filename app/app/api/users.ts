import { TClients } from "api/apiClients"

export type TUser = {
  discordUsername: string
  discordDiscriminator: string
  isStaff: boolean
}

export type TTokens = {
  access: string
  refresh: string
}

type Props = {
  signal?: AbortSignal
}

export const usersApi = ({ client, staffClient }: TClients) => ({
  currentUser: async ({ signal }: Props): Promise<TUser> =>
    await client
      .get("users/current-user", {
        signal,
      })
      .json(),

  forceToken: async ({ signal, profileId }: Props & { profileId: number }): Promise<TTokens> =>
    await staffClient
      .get(`users/force-token/${profileId}`, {
        signal,
      })
      .json(),
})
