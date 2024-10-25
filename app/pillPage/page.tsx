"use client";
import { useState, useRef, MouseEvent } from "react";
import Link from "next/link";
import "../styles/pill.scss";
import Image from "next/image";

// Importiere die Produktbilder
import product1Image from "../images/meno1.png";
import product2Image from "../images/meno2.png";
import product3Image from "../images/meno2.png";
import product4Image from "../images/meno2.png";
import product5Image from "../images/meno2.png";

type Product = {
  id: number;
  color: string;
  imgSrc: StaticImageData;
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
    { 
      id: 1, 
      color: "#D0BCFF", 
      imgSrc: product1Image, 
      title: "Klimadynon", 
      description: "Klimadynon is a herbal medicine designed to alleviate menopausal symptoms such as hot flashes and mood swings. It contains extracts of black cohosh, which naturally support hormone balance." 
    },
    { 
      id: 2, 
      color: "#D29DAC", 
      imgSrc: product2Image, 
      title: "Meno-Balance", 
      description: "Meno-Balance is a plant-based formula specifically developed to support well-being during menopause. It helps balance hormonal fluctuations and relieve symptoms like sleep disturbances and hot flashes." 
    },
    { 
      id: 3, 
      color: "#6750A4", 
      imgSrc: product3Image, 
      title: "Phyto-Meno", 
      description: "Phyto-Meno combines natural plant extracts to ease common menopausal symptoms such as anxiety and sleep disorders, drawing from traditional plant-based treatments." 
    },
    { 
      id: 4, 
      color: "#A0C4FF", 
      imgSrc: product4Image, 
      title: "Femi-Plus", 
      description: "Femi-Plus is a Bionorica herbal supplement designed to alleviate menopausal discomfort. It supports hormonal balance and helps reduce hot flashes and restlessness." 
    },
    { 
      id: 5, 
      color: "#FFD6A5", 
      imgSrc: product5Image, 
      title: "Meno-Aktiv", 
      description: "Meno-Aktiv is a natural remedy specifically developed for women going through menopause. It contains selected plant extracts to help reduce symptoms like sweating and nervousness." 
    }
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
    const walk = (x - startX.current) * 1.2; // Anpassung der Sensitivität
    if (containerRef.current) containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto p-8">
        <div
          className="relative mx-auto"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div
            ref={containerRef}
            className="sliderWrapper no-scrollbar flex gap-4 overflow-x-scroll p-4"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className={`w-[440px] h-auto flex-shrink-0 rounded-lg shadow-lg p-6 text-left cursor-pointer transform transition duration-300 ${
                  selectedBoxes.includes(product.id) ? "border-4 border-blue-500" : "border border-gray-200"
                } hover:scale-105`}
                style={{ backgroundColor: product.color }}
                onClick={() => handleBoxClick(product.id)}
              >
                <Image src={product.imgSrc} alt={product.title} className="rounded-t-lg mb-4 w-full h-[200px] object-cover" />
                <h2 className="text-xl font-bold tracking-tight text-[#F3F4F6] mb-2">{product.title}</h2>
                <p className="text-[#F3F4F6] text-base leading-6 whitespace-normal">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {selectedBoxes.length > 0 && (
          <div className="fixed bottom-4 left-0 w-full flex justify-center mb-10">
            <Link
              href="/questionPage"
              className="px-6 py-3 bg-[#6750A4] text-white rounded-lg hover:bg-[#543a85] transition-colors duration-300"
            >
              Go to Question Page
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
