import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const UserModel = types
  .model("User")
  .props({
    authenticated: types.maybe(types.boolean),
    staffAuthenticated: types.maybe(types.boolean),
  })
  .actions((self) => ({
    setAuthenticated: (authenticated: boolean) => {
      self.authenticated = authenticated
    },
    setStaffAuthenticated: (staffAuthenticated: boolean) => {
      self.staffAuthenticated = staffAuthenticated
    },
  }))

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
export const createUserDefaultModel = () => types.optional(UserModel, {})
