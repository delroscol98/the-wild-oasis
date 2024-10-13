import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://rusrliojlcyzuxibdewf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1c3JsaW9qbGN5enV4aWJkZXdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2NzkyNjgsImV4cCI6MjA0MzI1NTI2OH0.InloPseRuOldFoD6Rg5xetz4QX0ZFDBCwD4yCBJkCQ8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
