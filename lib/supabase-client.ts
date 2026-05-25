import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[supabase-client] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. " +
      "Auth features will be disabled."
  );
}

// createClient throws if either argument is empty — guard it so a missing env
// var degrades gracefully (auth returns null session) instead of crashing the
// entire store layout and breaking cart / checkout for guests.
export const supabaseClient = (() => {
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch {
    // Return a minimal stub that always returns empty/null responses.
    // Guests can still shop and check out; only /account is affected.
    return createClient("https://placeholder.supabase.co", "placeholder");
  }
})();
