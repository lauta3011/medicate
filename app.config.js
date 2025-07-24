export default ({ config }) => ({
    ...config,
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      supabaseStorage: process.env.SUPABASE_STORAGE_URL
    },
  });