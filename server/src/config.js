export class ConfigurationError extends Error {
  constructor(error) {
    super(`Missing ${error}, check your .env file`)
  }
}

export const HOST = process.env.HOST || "0.0.0.0"

export const PORT =
  process.env.PORT != null ? parseInt(process.env.PORT, 10) : 8080

if (process.env.DATABASE_URL == null) {
  throw new ConfigurationError("DATABASE_URL")
}

export const DATABASE_URL = process.env.DATABASE_URL

export const COOKIE_SECRET = "raihie6ohqueiBohn8taek5nai4tha"
