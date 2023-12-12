import { hash } from "bcrypt";
import prisma from "~/lib/prisma";

type TPostBody = {
  name: string;
  email: string;
  password: string;
  isSuperAdmin: boolean;
};

export async function GET() {
  const users = await prisma.user.findMany();

  return Response.json(users);
}

export async function POST(req: Request) {
  const body: TPostBody = await req.json();

  const exists = await prisma.user.findUnique({
    where: { email: body.email },
  });

  console.log("asd");

  if (exists) throw new Error("User already exists");

  console.log("masuk");

  const hashedPassword = await hash(body.password, 10);

  body.password = hashedPassword;

  const user = await prisma.user.create({
    data: {
      ...body,
    },
  });

  return Response.json(user);
}
