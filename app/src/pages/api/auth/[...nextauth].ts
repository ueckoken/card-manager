import { JWT } from 'next-auth/jwt';
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import axios, { AxiosError } from "axios";

const keycloak = KeycloakProvider({
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

async function doFinalSignoutHandshake(jwt: JWT) {
  const { id_token } = jwt;

  try {
    // Add the id_token_hint to the query string
    const params = new URLSearchParams();
    params.append('id_token_hint', id_token);
    const { status, statusText } = await axios.get(`${keycloak.options?.issuer}/protocol/openid-connect/logout?${params.toString()}`);

    // The response body should contain a confirmation that the user has been logged out
    console.log("Completed post-logout handshake", status, statusText);
  }
  catch (e: any) {
    console.error("Unable to perform post-logout handshake", (e as AxiosError)?.code || e)
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET as string,
  providers: [
    keycloak
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.groups = profile?.groups;
        token.sub = profile?.sub;
        token.id_token = account?.id_token as string;
      }
      return token
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      session.user.groups = token.groups
      session.user.sub = token.sub
      return session
    }
  },
  events: {
    signOut: ({ session, token }) => doFinalSignoutHandshake(token)
  },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60, }
}

export default NextAuth(authOptions);