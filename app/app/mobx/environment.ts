// import { Api } from "services/api"

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    // this.api = new Api()
  }

  async setup() {
    // await this.api.setup()
  }

  // api: Api
}
