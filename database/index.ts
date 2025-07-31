import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

export const { supabaseUrl, supabaseKey } = Constants.expoConfig?.extra || {};

export const supabase = createClient(supabaseUrl, supabaseKey);