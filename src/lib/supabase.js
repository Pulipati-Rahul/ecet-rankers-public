import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://ldviluqyhhspbwpwhjhu.supabase.co"

const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_8rozntpts88E0nHrSliOaQ_EUU4-kGT"

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
