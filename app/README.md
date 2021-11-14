## Code modifications

Replace `ios/Pods/AppAuth/Source/AppAuthCore/OIDAuthorizationService.m` with the `ios/OIDAuthorizationService.m`.
Changes there are required for the discord auth call to return our jwt.

### On RN upgrade

Include all changes from the [Upgrade helper](https://react-native-community.github.io/upgrade-helper/) except `project.pbxproj` changes.
Copy the whole `project.pbxproj` file with changed app name, and apply our changes manually:

- Go to target > Build Phases > Copy Bundle Resources
- Add all fonts from `app/assets/fonts`

## Running Storybook

From the command line in your generated app's root directory, enter `yarn run storybook`
This starts up the storybook server and opens a story navigator in your browser. With your app
running, choose Toggle Storybook from the developer menu to switch to Storybook; you can then
use the story navigator in your browser to change stories.

For Visual Studio Code users, there is a handy extension that makes it easy to load Storybook use cases into a running emulator via tapping on items in the editor sidebar. Install the `React Native Storybook` extension by `Orta`, hit `cmd + shift + P` and select "Reconnect Storybook to VSCode". Expand the STORYBOOK section in the sidebar to see all use cases for components that have `.story.tsx` files in their directories.

## Running e2e tests

Read [e2e setup instructions](./e2e/README.md).

## Credits

Based on [https://github.com/infinitered/ignite](https://github.com/infinitered/ignite)
