import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    isSuperAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
      isSuperAdmin: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
  }
}
