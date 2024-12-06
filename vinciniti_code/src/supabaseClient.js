// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

 
const SUPABASE_URL = 'https://eqorxvyjwnmcaljvjbon.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxb3J4dnlqd25tY2FsanZqYm9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxMzcwMDUsImV4cCI6MjA0NzcxMzAwNX0.dn0uoZXnlgQuLsbvXADnt9Kaw1MA7Z_waRB5XPzQFVA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
