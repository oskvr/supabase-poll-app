declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_KEY: string;
      NEXT_PUBLIC_SUPABASE_URL: string;
    }
  }
}

export {};
