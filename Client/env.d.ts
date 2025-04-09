declare namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string;
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
    }
  }