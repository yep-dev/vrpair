import * as Keychain from "react-native-keychain"

enum Key {
  refreshToken = "refreshToken",
  accessToken = "accessToken",
}

type SetSecureValue = (key: keyof typeof Key, value: string) => Promise<false | Keychain.Result>
type GetSecureValue = (key: keyof typeof Key) => Promise<string | false>
type RemoveSecureValue = (key: keyof typeof Key) => Promise<boolean>

export const setSecureValue: SetSecureValue = async (key, value) =>
  await Keychain.setGenericPassword(key /* <- can be a random string */, value, { service: key })

export const getSecureValue: GetSecureValue = async (key) => {
  const result = await Keychain.getGenericPassword({ service: key })
  if (result) {
    return result.password
  }
  return false
}

export const removeSecureValue: RemoveSecureValue = async (key) =>
  await Keychain.resetGenericPassword({ service: key })
