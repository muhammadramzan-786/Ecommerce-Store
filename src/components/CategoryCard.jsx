import React from "react";

export default function CategoryCard({ name, image, loading }) {
  // 🔹 If loading → shimmer card return
  if (loading) {
    return (
      <div className="group flex flex-col items-center animate-pulse">
        <div className="bg-gray-200 rounded-full mb-4 w-[110px] h-[110px]"></div>

        <div className="h-4 bg-gray-300 rounded w-20"></div>
      </div>
    );
  }

  // 🔹 Otherwise normal card
  return (
    <div className="group flex flex-col items-center">
      <div className="bg-[#e1e2e5] rounded-full flex items-center justify-center mb-4 w-[110px] h-[110px]">
        <img
          src={image}
          alt={name}
          loading="lazy"
          width={70}
          height={70}
          decoding="async"
          className="aspect-square object-cover"
        />
      </div>

      <div className="flex justify-center">
        <h3 className="inline-block font-medium text-center text-dark bg-linear-to-r from-blue to-blue 
          bg-[length:0px_1px] bg-left-bottom bg-no-repeat
          transition-[background-size] duration-500
          hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-blue">
          {name}
        </h3>
      </div>
    </div>
  );
}
