// ***************************************************************************
// Auth events handlers
// ***************************************************************************

import { kinde } from "."


export async function handleCallback() {
  console.log("Handling callback...")
  // Exchange auth code in query string for tokens
  await kinde.handleRedirectToApp(new URL(window.location.toString()))
  // Redirect back to app
  console.log("... redirecting to /")
  window.location.href = "/"
}

export async function handleLogout() {
  console.log("Handling logout...")
  const url = await kinde.logout()
  console.log("... redirecting to ", url)
  window.location.href = url.toString()
}

export async function handleLogin() {
  console.log("Handling login...")
  const url = await kinde.login()
  console.log("... redirecting to ", url)
  window.location.href = url.toString()
}

export async function handleRegister() {
  console.log("Handling register...")
  const url = await kinde.register()
  console.log("... redirecting to ", url)
  window.location.href = url.toString()
}
