import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { log } from "console";
import { randomUUID } from "crypto";
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
    async session({ session, token, user }: any) {
      session.user.username = session?.user?.name
        .split(" ")
        .join("")
        .toLowerCase();
      session.user.uid = token.sub;

      return session;
    },
    async signIn({ user }) {
      await axios
        .post("http://127.0.0.1:3000/api/account", {
          data: {
            name: user.name,
            email: user.email,
          },
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      return true;
    },
  },

  secret: process.env.SECRET_KEY,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
