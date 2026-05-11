'use client';
import { useEffect, useState } from "react";

type Product = {
  id: number,
  title: string,
  description: string,
}
export default function Home() {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  const handleCounter = (counter:any) => {
    (counter === "+") ? setCount(count + 1) : setCount( (state) => (state - 1 === -1 ? 0 : state - 1));
  }

  const getProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    const result = await data.products;
    setProducts(result);
  }

  
  useEffect(() => {
    getProducts();
    console.log(products);
  }, []);

  return (
    <>
    <div>
      <h1 className="text-3xl font-bold underline">Home Page</h1>
      <div className="flex items-center gap-4 mt-4">
        <button className="w-8 border border-1 cursor-pointer" onClick={() => handleCounter("-")}>-</button>
        <div className="p-3">{count}</div>
        <button className="w-8 border border-1 cursor-pointer" onClick={() => handleCounter("+")}>+</button>
      </div>
    </div>

    <div className="flex">
      <ul className="gap-4">
        {products.map((product) => (
          <li key={product.id} className="flex flex-col gap-2">
            <h4>{product.title}</h4>
            <span>{product.description}</span>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
