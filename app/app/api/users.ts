import { TClients } from "api/apiClients"

export type TUser = {
  hasProfile: boolean
  id: number
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

export const usersKeys = {
  currentUser: ["users", "currentUser"],
}

export const usersApi = ({ client, staffClient }: TClients) => ({
  currentUser: async ({ signal }: Props): Promise<TUser> =>
    await client
      .get("users/current-user", {
        signal,
      })
      .json(),

  forceToken: async ({
    signal,
    ...data
  }: Props & ({ userId: string } | { profileId: string })): Promise<TTokens> =>
    await staffClient
      .get(`users/force-token`, {
        searchParams: { ...data },
        signal,
      })
      .json(),
})
