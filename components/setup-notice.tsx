"use client"

export function SetupNotice() {
  const isSupabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://your-project.supabase.co"

  if (isSupabaseConfigured) return null

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <span className="text-yellow-400 text-xl">⚠️</span>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <strong>Development Mode:</strong> Supabase is not configured. Using mock data.
            <br />
            To connect to Supabase, add your credentials to{" "}
            <code className="bg-yellow-100 px-1 rounded">.env.local</code>
          </p>
        </div>
      </div>
    </div>
  )
}
