"use client"

import { useState, useEffect } from "react"
import { supabase, type StoreSettings } from "@/lib/supabase"

// Mock settings for development
const MOCK_SETTINGS: StoreSettings = {
  id: "1",
  is_open: true,
  opening_hours: "08:00",
  closing_hours: "22:00",
  updated_at: new Date().toISOString(),
}

export function useStoreSettings() {
  const [settings, setSettings] = useState<StoreSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      // Check if Supabase is properly configured
      const isSupabaseConfigured =
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://your-project.supabase.co"

      if (!isSupabaseConfigured) {
        // Use mock data for development
        console.log("Using mock store settings - Supabase not configured")
        setSettings(MOCK_SETTINGS)
        setLoading(false)
        return
      }

      const { data, error } = await supabase.from("store_settings").select("*").single()

      if (error) throw error
      setSettings(data)
    } catch (err) {
      console.error("Error fetching store settings:", err)
      // Fallback to mock data
      setSettings(MOCK_SETTINGS)
    } finally {
      setLoading(false)
    }
  }

  const updateSettings = async (updates: Partial<StoreSettings>) => {
    try {
      // Check if Supabase is properly configured
      const isSupabaseConfigured =
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://your-project.supabase.co"

      if (!isSupabaseConfigured) {
        // Update mock data for development
        console.log("Updating mock settings:", updates)
        setSettings((prev) => (prev ? { ...prev, ...updates } : null))
        return
      }

      const { error } = await supabase.from("store_settings").update(updates).eq("id", settings?.id)

      if (error) throw error
      await fetchSettings()
    } catch (err) {
      console.error("Error updating store settings:", err)
    }
  }

  return { settings, loading, updateSettings, refetch: fetchSettings }
}
