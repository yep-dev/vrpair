import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserModel } from "mobx/user/user"
import { createContext } from "react"

export const RootStoreModel = types.model("RootStore").props({
  userStore: types.optional(UserModel, {} as any),
})

export interface RootStore extends Instance<typeof RootStoreModel> {}

export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}

export const RootStoreContext = createContext<RootStore>({} as RootStore)
