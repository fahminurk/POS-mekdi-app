import prisma from "~/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const category = await prisma.category.delete({ where: { id } });

  return Response.json(category);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await req.json();

  const category = await prisma.category.update({
    where: {
      id,
    },
    data: {
      ...body,
    },
  });

  return Response.json(category);
}
