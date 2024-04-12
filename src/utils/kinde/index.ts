import { createKindeBrowserClient } from "@kinde-oss/kinde-typescript-sdk"
import { SessionStorageBrowserSessionManager } from "./SessionManager"

// ***************************************************************************
// Create Kinde client
// ***************************************************************************

export const kinde = createKindeBrowserClient({
  authDomain: "https://account-dev.documatt.com",
  clientId: "06b753ecf39a41ee8ddcbf9a85cdfe36",
  redirectURL: "http://localhost:5173/callback.html",
  logoutRedirectURL: "http://localhost:5173/login.html",
  // redirectURL: "https://liborjelinek.github.io/kinde-ts-sdk-page-reload-demo/callback.html",
  // logoutRedirectURL: "https://liborjelinek.github.io/kinde-ts-sdk-page-reload-demo/login.html",
  // sessionManager: new SessionStorageBrowserSessionManager()
})