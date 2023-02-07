import NextAuth, { DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface DefaultJWT extends DefaultJWT {
    groups?: string[]
  }

  interface Session {
    user: User | JWT
  }

  interface User extends DefaultUser {
    groups?: string[]
  }

  interface Profile extends DefaultProfile {
    groups?: string[]
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    groups?: string[]
  }
}