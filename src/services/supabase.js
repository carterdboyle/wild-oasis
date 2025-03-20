import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wdoxacjdxsgcaskrjkkp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indkb3hhY2pkeHNnY2Fza3Jqa2twIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0OTIwNTgsImV4cCI6MjA1ODA2ODA1OH0.LWAkoaALXG3b2l28BpdvwBTfsv5gtgVXzCj0PC1PFso";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
