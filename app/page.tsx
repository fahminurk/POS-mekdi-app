"use client";
import { useCategoryQuery } from "~/actions/useCategory";
import Header from "~/components/Header";
import Orderbar from "~/components/OrderBar";
import ProductCard from "~/components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
export default function Home() {
  const { data } = useCategoryQuery();

  return (
    <Orderbar>
      <Header />
      <Tabs defaultValue={"Burger"} className="p-2">
        <TabsList className={`w-full `}>
          {data?.map((item) => (
            <TabsTrigger key={item.id} value={item.name} className="w-full">
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {data?.map((item) => (
          <TabsContent key={item.id} value={item.name}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {item.products.map((product) => (
                <ProductCard key={product.id} props={product} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Orderbar>
  );
}
