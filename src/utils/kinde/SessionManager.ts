// ***************************************************************************
// sessionStorage
// ***************************************************************************

import type { SessionManager } from "@kinde-oss/kinde-typescript-sdk"

export class SessionStorageBrowserSessionManager implements SessionManager {
  // Need to track all keys to delete on logout
  private PREFIX = "kinde_"

  private withPrefix(key: string): string {
    return this.PREFIX + key
  }

  async getSessionItem(itemKey: string) {
    return this.getSessionItemBrowser(itemKey)
  }
  async getSessionItemBrowser(itemKey: string) {
    itemKey = this.withPrefix(itemKey)
    return JSON.parse(sessionStorage.getItem(itemKey))
  }

  async setSessionItem(itemKey: string, itemValue: unknown) {
    this.setSessionItemBrowser(itemKey, itemValue)
  }
  async setSessionItemBrowser(itemKey: string, itemValue: unknown) {
    itemKey = this.withPrefix(itemKey)
    sessionStorage.setItem(itemKey, JSON.stringify(itemValue))
  }

  async removeSessionItem(itemKey: string) {
    this.removeSessionItemBrowser(itemKey)
  }
  async removeSessionItemBrowser(itemKey: string) {
    itemKey = this.withPrefix(itemKey)
    sessionStorage.removeItem(itemKey)
  }

  async destroySession() {
    // Called on logout
    // Collect keys with the prefix
    const keys = []
    for (let i = 0; i < sessionStorage.length; i++) {
      const key: string = sessionStorage.key(i)
      if (key.startsWith(this.PREFIX)) {
        keys.push(key)
      }
    }
    // Delete it
    for (let i = 0; i < keys.length; i++) {
      sessionStorage.removeItem(keys[i])
    }
    // Cannot do it within for loop because removeItem() change sessionStorage.length
  }
}