/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import bgMessaging from "./utils/bgMessaging";
import { name as appName } from "./app.json";

// Main application
AppRegistry.registerComponent(appName, () => App);
// Background Messaging
AppRegistry.registerHeadlessTask(
  "RNFirebaseBackgroundMessage",
  () => bgMessaging
);
