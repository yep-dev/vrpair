import { getEnv, getRoot, IStateTreeNode } from "mobx-state-tree"
import { Environment } from "models/environment"
import { useContext } from "react"
import { RootStore, RootStoreContext, RootStoreModel } from "./root-store/root-store"

export const withEnvironment = (self: IStateTreeNode) => ({
  views: {
    get environment() {
      return getEnv<Environment>(self)
    },
  },
})

export const withRootStore = (self: IStateTreeNode) => ({
  views: {
    get rootStore(): RootStore {
      return getRoot<typeof RootStoreModel>(self)
    },
  },
})

export const useStore = () => useContext(RootStoreContext)
