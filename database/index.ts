import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rmmhfwtstrhaovyddxvn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtbWhmd3RzdHJoYW92eWRkeHZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMDY4NDksImV4cCI6MjA2NDU4Mjg0OX0.YH1M27gWrdZflFSaWO_Or0Jfm1vKeObuwEHbPd-sK0A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);