import prisma from "~/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true },
  });

  return Response.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();

  const product = await prisma.product.create({
    data: {
      name: body.name,
      description: body.description,
      price: Number(body.price),
      stock: Number(body.stock),
      categoryId: body.categoryId,
      imgUrl: body.imgUrl,
    },
  });

  return Response.json(product);
}
