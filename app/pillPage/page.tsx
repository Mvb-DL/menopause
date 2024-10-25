"use client";
import { useState, useRef, MouseEvent } from "react";
import Link from "next/link";
import "../styles/pill.scss";

type Product = {
  id: number;
  color: string;
  imgSrc: string;
  title: string;
  description: string;
};

export default function SlidingProductBoxes() {
  const [selectedBoxes, setSelectedBoxes] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const products: Product[] = [
    { id: 1, color: "#D0BCFF", imgSrc: "/product1.jpg", title: "Product 1", description: "This is product 1." },
    { id: 2, color: "#D29DAC", imgSrc: "/product2.jpg", title: "Product 2", description: "This is product 2." },
    { id: 3, color: "#6750A4", imgSrc: "/product3.jpg", title: "Product 3", description: "This is product 3." },
    { id: 4, color: "#D0BCFF", imgSrc: "/product4.jpg", title: "Product 4", description: "This is product 4." },
    { id: 5, color: "#D29DAC", imgSrc: "/product5.jpg", title: "Product 5", description: "This is product 5." },
  ];

  const handleBoxClick = (productId: number) => {
    setSelectedBoxes((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.pageX - (containerRef.current?.offsetLeft ?? 0);
    scrollLeft.current = containerRef.current?.scrollLeft ?? 0;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1.5;
    if (containerRef.current) containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto p-8">
        <div
          className="relative overflow-hidden max-w-full mx-auto"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div
            ref={containerRef}
            className="flex gap-4 cursor-grab active:cursor-grabbing"
            style={{ overflowX: "hidden", scrollBehavior: "smooth", paddingBottom: "16px" }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className={`box min-w-[300px] flex-shrink-0 rounded-lg p-4 cursor-pointer transition-transform duration-300 ${
                  selectedBoxes.includes(product.id) ? "selected border-4 border-blue-500" : ""
                }`}
                style={{ backgroundColor: product.color }}
                onClick={() => handleBoxClick(product.id)}
              >
                <img src={product.imgSrc} alt={product.title} className="w-full h-32 object-cover rounded-md mb-2" />
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-sm">{product.description}</p>
              </div>
            ))}
          </div>
        </div>

        {selectedBoxes.length > 0 && (
          <div className="fixed bottom-4 left-0 w-full flex justify-center mb-10">
            <Link href="/questionPage" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
           
                Go to Question Page
             
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
