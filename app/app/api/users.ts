import { Clients } from "api/apiClients"

export type User = {
  hasProfile: boolean
  id: number
  discordUsername: string
  discordDiscriminator: string
  isStaff: boolean
}

export type Tokens = {
  access: string
  refresh: string
}

type Props = {
  signal?: AbortSignal
}

export const usersKeys = {
  currentUser: ["users", "currentUser"],
}

export const usersApi = ({ client, staffClient }: Clients) => ({
  currentUser: async ({ signal }: Props): Promise<User> =>
    await client
      .get("users/current-user", {
        signal,
      })
      .json(),

  forceToken: async ({
    signal,
    ...data
  }: Props & ({ userId: string } | { profileId: string })): Promise<Tokens> =>
    await staffClient
      .get(`users/force-token`, {
        searchParams: { ...data },
        signal,
      })
      .json(),
})
