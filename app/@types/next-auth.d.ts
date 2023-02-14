import NextAuth, { DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface DefaultJWT extends DefaultJWT {
    groups?: string[]
    sub?: string
  }

  interface Session {
    user: User | JWT
  }

  interface User extends DefaultUser {
    groups?: string[]
    sub?: string
  }

  interface Profile extends DefaultProfile {
    groups?: string[]
    sub?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    groups?: string[]
    sub?: string
    provider: string
    id_token: string
  }
}