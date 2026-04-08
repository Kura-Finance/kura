import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAppStore } from '../store/useAppStore'
import { useFinanceStore } from '../store/useFinanceStore'

/**
 * Storage adapter that implements the AppKit Storage interface
 * with AsyncStorage as the underlying implementation
 */
export class StorageAdapter {
  private prefix = 'appkit_'

  /**
   * Get a value by key
   */
  async getItem(key: string): Promise<any> {
    try {
      const prefixedKey = this.prefix + key
      const value = await AsyncStorage.getItem(prefixedKey)
      return value ? JSON.parse(value) : null
    } catch (error) {
      console.error(`Failed to get item ${key}:`, error)
      return null
    }
  }

  /**
   * Set a value by key
   */
  async setItem(key: string, value: any): Promise<void> {
    try {
      const prefixedKey = this.prefix + key
      const serialized = typeof value === 'string' ? value : JSON.stringify(value)
      await AsyncStorage.setItem(prefixedKey, serialized)
    } catch (error) {
      console.error(`Failed to set item ${key}:`, error)
    }
  }

  /**
   * Remove a value by key
   */
  async removeItem(key: string): Promise<void> {
    try {
      const prefixedKey = this.prefix + key
      await AsyncStorage.removeItem(prefixedKey)
    } catch (error) {
      console.error(`Failed to remove item ${key}:`, error)
    }
  }

  /**
   * Get all keys
   */
  async getKeys(): Promise<string[]> {
    try {
      const allKeys = await AsyncStorage.getAllKeys()
      // Filter to only return keys with our prefix
      return allKeys
        .filter(key => key.startsWith(this.prefix))
        .map(key => key.substring(this.prefix.length))
    } catch (error) {
      console.error('Failed to get keys:', error)
      return []
    }
  }

  /**
   * Get all entries as key-value pairs
   */
  async getEntries(): Promise<[string, any][]> {
    try {
      const keys = await this.getKeys()
      const entries: [string, any][] = []

      for (const key of keys) {
        const value = await this.getItem(key)
        if (value !== null) {
          entries.push([key, value])
        }
      }

      return entries
    } catch (error) {
      console.error('Failed to get entries:', error)
      return []
    }
  }

  /**
   * Clear all stored data with our prefix
   */
  async clear(): Promise<void> {
    try {
      const keys = await this.getKeys()
      await AsyncStorage.multiRemove(keys.map(key => this.prefix + key))
    } catch (error) {
      console.error('Failed to clear storage:', error)
    }
  }

  /**
   * Sync app state with storage (write)
   * Called on app shutdown or state updates
   */
  async syncAppState(): Promise<void> {
    try {
      const appState = useAppStore.getState()
      const financeState = useFinanceStore.getState()

      // Store authentication state
      if (appState.authToken) {
        await this.setItem('auth_token', appState.authToken)
        await this.setItem('auth_status', appState.authStatus)
      }

      // Store user profile
      if (appState.userProfile) {
        await this.setItem(
          'user_profile',
          appState.userProfile
        )
      }

      // Store preferences
      if (appState.preferences) {
        await this.setItem(
          'user_preferences',
          appState.preferences
        )
      }

      // Store finance state
      if (financeState.selectedTimeRange) {
        await this.setItem('selected_time_range', financeState.selectedTimeRange)
      }

      if (financeState.isAiOptedIn) {
        await this.setItem('ai_opted_in', financeState.isAiOptedIn)
      }

      console.log('App state synchronized to storage')
    } catch (error) {
      console.error('Failed to sync app state:', error)
    }
  }

  /**
   * Restore app state from storage (read)
   * Called on app startup
   */
  async restoreAppState(): Promise<void> {
    try {
      const appStore = useAppStore.getState()
      const financeStore = useFinanceStore.getState()

      // Restore preferences
      const preferences = await this.getItem('user_preferences')
      if (preferences) {
        try {
          appStore.setBaseCurrency(preferences.baseCurrency || 'USD')
          // Note: toggle methods exist in store for alerts and summary
        } catch (e) {
          console.error('Failed to restore preferences:', e)
        }
      }

      // Restore time range selection
      const timeRange = await this.getItem('selected_time_range')
      if (timeRange && ['1M', '3M', '6M', '1Y', 'All'].includes(timeRange)) {
        financeStore.setSelectedTimeRange(timeRange)
      }

      // Restore AI opt-in status
      const isOptedIn = await this.getItem('ai_opted_in')
      if (isOptedIn && !financeStore.isAiOptedIn) {
        financeStore.toggleAiOptIn()
      }

      console.log('App state restored from storage')
    } catch (error) {
      console.error('Failed to restore app state:', error)
    }
  }
}

// Export a singleton instance
export const storageAdapter = new StorageAdapter()
