import React from "react";
import ProductGrid from "../components/ProductGrid";

const Menu = ({ darkMode }) => {
  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="text-center pt-12 pb-6">
        <h1 className={`text-5xl font-bold tracking-tight ${darkMode ? "text-pink-400" : "text-black"}`}>
          Menu
        </h1>
        <div className={`mt-4 w-16 h-[2px] mx-auto opacity-20 ${darkMode ? "bg-pink-400" : "bg-black"}`} />
      </div>

      <div className="px-6 py-6">
        <ProductGrid darkMode={darkMode} />
      </div>
    </div>
  );
};

export default Menu;
