import prisma from "~/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({
    include: { products: true },
  });

  return Response.json(categories);
}

export async function POST(req: Request) {
  const body = await req.json();

  const category = await prisma.category.create({
    data: {
      ...body,
    },
  });

  return Response.json(category);
}
