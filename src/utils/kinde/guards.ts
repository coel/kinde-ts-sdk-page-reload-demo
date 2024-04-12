import { kinde } from "."
import { handleLogin } from "./handlers"

/**
 * Wait specified time and crash, if limit elapsed. The point is that limit
 * should never be elapsed.
 *
 * Programatic navigation (via location.href or location.replace() or assing())
 * happens asynchronously in the background while the remaining of the JS
 * continues to execute. It looks weird because SPA will "flash" (render) for a
 * few milliseconds.
 */
async function _waitAndFail() {
  const sleep = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms))
  const step = 500
  for (let elapsed = 0; elapsed <= 5000; elapsed += step) {
    console.log(`Elapsed ${elapsed} in wait or fail loop`)
    await sleep(step)
  }
  throw new Error("Redirection to login takes too long")
}

/**
 * Redirects to login page if not authenticated (i.e., terminate current JS execution). Otherwise returns obtained access token as JWT to be sent in `Authorization: Bearer xxx`.
 */
export async function redirectToLoginOrGetAccessToken(): Promise<string> {
  // called from index.html
  const isAuthenticated = await kinde.isAuthenticated()

  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login")
    await handleLogin()
    await _waitAndFail()
  }

  const user = await kinde.getUser()
  console.log(`Authenticated as ${JSON.stringify(user)}`)

  const token = await kinde.getToken()
  return token
}
