import { PrismaAdapter } from "@next-auth/prisma-adapter";
import nextAuth, { AuthOptions } from "next-auth";
import prisma from "~/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) throw new Error("user not found");

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) throw new Error("Invalid password");

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "credentials") {
        token.isSuperAdmin = user.isSuperAdmin;
        // console.log(user);
        // console.log(token);
      }
      return token;
    },
    async session({ session, token }) {
      session.user.isSuperAdmin = token.isSuperAdmin as boolean;
      session.user.id = token.sub as string;
      // console.log(session);
      // console.log(token);

      return session;
    },
  },
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
