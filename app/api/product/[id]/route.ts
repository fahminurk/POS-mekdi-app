import prisma from "~/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const product = await prisma.product.delete({ where: { id } });

  return Response.json(product);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await req.json();

  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      ...body,
      price: Number(body.price),
      stock: Number(body.stock),
    },
  });

  return Response.json(product);
}
