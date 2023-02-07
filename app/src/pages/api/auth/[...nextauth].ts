import { signIn } from 'next-auth/react';
import NextAuth, { Profile, Session, User } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { JWT } from 'next-auth/jwt';

let users;

export default NextAuth({
  secret: process.env.SECRET as string,
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID as string,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      issuer: process.env.KEYCLOAK_ISSUER as string,
      authorization: {
        params: {
          scope: "openid profile email groups",
        },
      },
      name: "Koken SSO",
      style: {
        logo: "../../logo.svg",
        logoDark: "../../logo.svg",
        bg: "#ffffff",
        bgDark: "#ffffff",
        text: "#000000",
        textDark: "#000000",
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, profile }) {
      if (user) token.groups = profile?.groups;
      return token
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      session.user.groups = token.groups
      return session
    },
  }
});