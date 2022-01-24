import { onSnapshot } from "mobx-state-tree"

import { storageGet, storageSet } from "utils/misc"

import { Environment } from "./environment"
import { RootStoreModel, RootStore } from "./root-store"

const ROOT_STATE_STORAGE_KEY = "root"

export const createEnvironment = async () => {
  const env = new Environment()
  await env.setup()
  return env
}

export const setupRootStore = async () => {
  let rootStore: RootStore
  let data: any

  // prepare the environment that will be associated with the RootStore.
  const env = await createEnvironment()
  try {
    // load data from storage
    data = storageGet(ROOT_STATE_STORAGE_KEY)
    rootStore = RootStoreModel.create(data, env)
  } catch (e) {
    // if there's any problems loading, then let's at least fallback to an empty state
    // instead of crashing.
    rootStore = RootStoreModel.create({}, env)

    // but please inform us what happened
    // @ts-ignore
    // eslint-disable-next-line no-console
    __DEV__ && console.tron.error(e.message, null)
  }

  // reactotron logging
  if (__DEV__) {
    env.reactotron.setRootStore(rootStore, data)
  }

  // track changes & save to storage
  onSnapshot(rootStore, (snapshot) => storageSet(ROOT_STATE_STORAGE_KEY, snapshot))

  return rootStore
}
