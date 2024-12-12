export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        JWT_SECRET: string;
        // PORT : number
        // DB_PORT:  number  
        // DB_PORT_SERVER: number 
        // DB_HOST: string
        // DB_DATABASE: string
        // DB_USERNAME: string
        // DB_PASSWORD: string
      // SUPABASE_PROJECT_URL: string;
      // ENV: "test" | "dev" | "prod";
    }
  }
}