export default ({ config }) => ({
    ...config,
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_KEY,
      supabaseStorage: process.env.SUPABASE_STORAGE_URL,
      eas: {
        projectId: "5b241f49-90dd-420c-a553-4dbbbff0ae9b"
      }
    },
  });