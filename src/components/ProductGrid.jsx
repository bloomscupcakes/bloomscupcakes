import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { PRODUCTS } from "../utils/config";
import { motion, AnimatePresence } from "framer-motion";

const getTierCount = (packName) => {
  if (/3\s*tier/i.test(packName)) return 3;
  if (/2\s*tier/i.test(packName)) return 2;
  if (/single/i.test(packName)) return 1;
  return 1;
};

const makeDiameterDefaults = (product, count) => {
  const defaultDiameter = product.diameters?.[0] || { label: "", extra: 0 };
  return Array.from({ length: count }, () => defaultDiameter);
};

export default function ProductGrid({ darkMode }) {
  const { addItem } = useCart();
  const [selectedPack, setSelectedPack] = useState({});
  const [selectedFlavour, setSelectedFlavour] = useState({});
  const [selectedFilling, setSelectedFilling] = useState({});
  const [selectedDiameter, setSelectedDiameter] = useState({});
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const initialPacks = {};
    const initialFlavours = {};
    const initialFillings = {};
    const initialDiameters = {};

    PRODUCTS.forEach((product) => {
      initialPacks[product.id] = product.packSizes[0];
      const flavourOptions = product.flavours || FLAVOURS;
      initialFlavours[product.id] = flavourOptions[0];
      if (product.fillings?.length) {
        initialFillings[product.id] = product.fillings[0];
      }
      if (product.diameters?.length) {
        initialDiameters[product.id] = makeDiameterDefaults(product, getTierCount(product.packSizes[0].name));
      }
    });

    setSelectedPack(initialPacks);
    setSelectedFlavour(initialFlavours);
    setSelectedFilling(initialFillings);
    setSelectedDiameter(initialDiameters);
  }, []);

  const handlePackChange = (product, pack) => {
    setSelectedPack((prev) => ({ ...prev, [product.id]: pack }));
    if (product.diameters?.length) {
      const count = getTierCount(pack.name);
      setSelectedDiameter((prev) => ({
        ...prev,
        [product.id]: makeDiameterDefaults(product, count),
      }));
    }
  };

  const handleAddToCart = (product) => {
    const sizeInfo = selectedPack[product.id] || product.packSizes[0];
    const flavourOptions = product.flavours || FLAVOURS;
    const flavourInfo = selectedFlavour[product.id] || flavourOptions[0];
    const fillingInfo = selectedFilling[product.id] || null;
    const diameterInfo = selectedDiameter[product.id] || [];

    addItem({
      id: product.id,
      title: product.title,
      selectedPackSize: sizeInfo.name,
      selectedFlavour: flavourInfo.label,
      selectedFilling: fillingInfo?.label,
      selectedDiameters: diameterInfo.map((d) => d.label),
      quantity: 1,
    });
    setToast(`Added ${product.title} (${sizeInfo.name}, ${flavourInfo.label}) to cart!`);
    setTimeout(() => setToast(null), 3000);
  };

  const getPrice = (product) => {
    const sizeInfo = selectedPack[product.id] || product.packSizes[0];
    const flavourOptions = product.flavours || FLAVOURS;
    const flavourInfo = selectedFlavour[product.id] || flavourOptions[0];
    const fillingInfo = selectedFilling[product.id] || null;
    const diameterInfo = selectedDiameter[product.id] || [];
    return (
      sizeInfo.price +
      (flavourInfo?.extra || 0) +
      (fillingInfo?.extra || 0) +
      diameterInfo.reduce((sum, item) => sum + (item?.extra || 0), 0)
    );
  };

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${darkMode ? "bg-stone-900 text-stone-100" : "bg-amber-50/50 text-stone-800"}`}>
      <div className="max-w-6xl mx-auto">

        {/* Dynamic Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`flex flex-col justify-between h-full rounded-3xl overflow-hidden shadow-lg border transition-colors duration-300 ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-pink-100"
              }`}
            >
              <div>
                {/* Media Section */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={selectedPack[product.id]?.img || product.packSizes[0].img}
                    alt={product.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className={`text-xl font-black mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {product.title}
                  </h3>

                  <div className="space-y-4">
                    {/* 1. Pack Size Options */}
                    <div className={`pb-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                      <label className="text-[10px] uppercase tracking-[0.3em] font-black opacity-70 mb-2 block">
                        Pack Size
                      </label>
                      <select
                        value={selectedPack[product.id]?.name || product.packSizes[0].name}
                        onChange={(e) => {
                          const pack = product.packSizes.find((ps) => ps.name === e.target.value);
                          if (pack) handlePackChange(product, pack);
                        }}
                        className={`w-full rounded-2xl border-2 px-4 py-3 text-sm outline-none transition ${
                          darkMode ? "bg-gray-900 text-white border-gray-700 focus:border-pink-400" : "bg-white text-gray-900 border-gray-200 focus:border-pink-500"
                        }`}
                      >
                        {product.packSizes.map((ps) => (
                          <option key={ps.name} value={ps.name}>
                            {ps.name} - ${ps.price}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 2. Flavour Options */}
                    <div className={`pb-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                      <label className="text-[10px] uppercase tracking-[0.3em] font-black opacity-70 mb-2 block">
                        Flavour
                      </label>
                      <select
                        value={selectedFlavour[product.id]?.label || (product.flavours || FLAVOURS)[0].label}
                        onChange={(e) => {
                          const flavour = (product.flavours || FLAVOURS).find((fl) => fl.label === e.target.value);
                          if (flavour) setSelectedFlavour((prev) => ({ ...prev, [product.id]: flavour }));
                        }}
                        className={`w-full rounded-2xl border-2 px-4 py-3 text-sm outline-none transition capitalize ${
                          darkMode ? "bg-gray-900 text-white border-gray-700 focus:border-pink-400" : "bg-white text-gray-900 border-gray-200 focus:border-pink-500"
                        }`}
                      >
                        {(product.flavours || FLAVOURS).map((fl) => (
                          <option key={fl.label} value={fl.label}>
                            {fl.label} {fl.extra > 0 ? `(+ $${fl.extra})` : ""}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 3. Conditional Cake Fillings */}
                    {product.fillings?.length > 0 && (
                      <div className={`pb-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black opacity-70 mb-2 block">
                          Filling
                        </label>
                        <select
                          value={selectedFilling[product.id]?.label || product.fillings[0].label}
                          onChange={(e) => {
                            const filling = product.fillings.find((fill) => fill.label === e.target.value);
                            if (filling) setSelectedFilling((prev) => ({ ...prev, [product.id]: filling }));
                          }}
                          className={`w-full rounded-2xl border-2 px-4 py-3 text-sm outline-none transition capitalize ${
                            darkMode ? "bg-gray-900 text-white border-gray-700 focus:border-pink-400" : "bg-white text-gray-900 border-gray-200 focus:border-pink-500"
                        }`}
                        >
                          {product.fillings.map((fill) => (
                            <option key={fill.label} value={fill.label}>
                              {fill.label} {fill.extra > 0 ? `(+ $${fill.extra})` : ""}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* 4. Conditional Cake Tier Diameters */}
                    {product.diameters?.length > 0 && (
                      <div className={`pb-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                        <div className="text-[10px] uppercase tracking-[0.3em] font-black opacity-70 mb-3">
                          Cake Diameters
                        </div>
                        <div className="space-y-4">
                          {Array.from({ length: getTierCount(selectedPack[product.id]?.name || product.packSizes[0].name) }, (_, tierIndex) => (
                            <div key={tierIndex} className="space-y-1">
                              <label className="text-xs font-bold opacity-80">Tier {tierIndex + 1} size </label>
                              <select
                                value={selectedDiameter[product.id]?.[tierIndex]?.label || product.diameters[0].label}
                                onChange={(e) => {
                                  const diam = product.diameters.find((d) => String(d.label) === e.target.value);
                                  if (!diam) return;
                                  setSelectedDiameter((prev) => {
                                    const current = prev[product.id] || makeDiameterDefaults(product, tierIndex + 1);
                                    const nextArray = [...current];
                                    nextArray[tierIndex] = diam;
                                    return { ...prev, [product.id]: nextArray };
                                  });
                                }}
                                className={`w-full rounded-2xl border-2 px-4 py-3 text-sm outline-none transition ${
                                  darkMode ? "bg-gray-900 text-white border-gray-700 focus:border-pink-400" : "bg-white text-gray-900 border-gray-200 focus:border-pink-500"
                                }`}
                              >
                                {product.diameters.map((diam) => (
                                  <option key={diam.label} value={diam.label}>
                                    {diam.label} {diam.extra > 0 ? `(+ $${diam.extra})` : ""}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0 flex items-center justify-between mt-auto">
                <span className={`text-2xl font-black ${darkMode ? "text-pink-400" : "text-pink-600"}`}>
                  ${getPrice(product).toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-transform active:scale-95 shadow-md shadow-pink-500/20"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Toast Notification System */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-6 right-6 font-bold px-6 py-3.5 rounded-2xl shadow-xl z-50 text-sm border ${
              darkMode 
                ? "bg-gray-800 text-emerald-400 border-gray-700" 
                : "bg-white text-emerald-600 border-emerald-100"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}