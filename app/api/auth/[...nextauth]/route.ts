import NextAuth, { Account, NextAuthOptions, Profile, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }: any) {
      session.user.username = session?.user?.name
        .split(" ")
        .join("")
        .toLowerCase();
      session.user.uid = token.sub;
      return session;
    },
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log(user, "user");
    //   console.log(account, "acc");
    //   console.log(profile, "prof");
    //   console.log(email, "email");
    //   console.log(credentials, "cred");

    //   return true;
    // },
  },
  secret: process.env.SECRET_KEY,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
