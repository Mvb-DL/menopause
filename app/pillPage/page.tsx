"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import product1Image from "../images/meno1.png";
import product2Image from "../images/meno2.png";
import product3Image from "../images/meno2.png";

interface Product {
  id: number;
  color: string;
  imgSrc: StaticImageData;  // Typ `StaticImageData` wird für das Bild verwendet
  title: string;
  description: string;
}

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
];

const ProductCard: React.FC<{ product: Product; onSelect: (id: number) => void; isSelected: boolean }> = ({ product, onSelect, isSelected }) => (
  <div
    className={`transform transition duration-300 ease-in-out p-3 w-160 h-250 rounded-lg shadow-lg cursor-pointer mx-4
    ${isSelected ? 'ring-4 ring-indigo-500 scale-105' : 'hover:scale-105'}`}
    style={{ backgroundColor: product.color }}
    onClick={() => onSelect(product.id)}
  >
    <Image src={product.imgSrc} alt={product.title} className="w-full h-40 object-cover rounded-t-lg m-8" />
    <div className="p-3">
      <h2 className="text-2xl  text-[#F3E4F6] font-semibold">{product.title}</h2>
      <p className="text-[#F3F4F6] text-md">{product.description}</p>
    </div>
  </div>
);

const RenderProductCards = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const router = useRouter();

  const handleSelect = (id: number) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const handleButtonClick = () => {
    router.push('/questionPage');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#E6E0E9]">
      <h1 className="text-center text-4xl font-semibold mb-10">
        What medication are you taking for your menopausal symptoms?
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={handleSelect}
            isSelected={selectedId === product.id}
          />
        ))}
      </div>
      {selectedId && (
        <button
          onClick={handleButtonClick}
          className="mt-8 px-8 py-4 bg-[#6750A4] text-white text-lg font-bold rounded-lg shadow-md hover:bg-[#5a4692] transition"
        >
          Start Diary
        </button>
      )}
    </div>
  );
};

export default RenderProductCards;
