export type User = {
  _id: string;
  fullname: string;
  email: string;
  isSuperAdmin: boolean;
};

export type editProductProps = {
  name: string;
  id: string;
  price: number;
  description: string;
  stock: number;
  categoryId: string;
  imgUrl: string;
};
