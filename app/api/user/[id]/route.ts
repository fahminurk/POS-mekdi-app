import prisma from "~/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const user = await prisma.user.delete({ where: { id } });

  return Response.json(user);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await req.json();

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...body,
    },
  });

  return Response.json(user);
}
