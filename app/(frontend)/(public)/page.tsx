'use client';
import { useEffect, useState } from "react";

type Product = {
  id: number,
  title: string,
  description: string,
}
export default function Home() {

  return (
    <>
    <div>
      <h1 className="text-3xl font-bold underline">Home Page</h1>
      
    </div>
    </>
  );
}
