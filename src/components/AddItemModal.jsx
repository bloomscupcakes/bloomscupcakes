import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const getTierCount = (packName) => {
  if (/3\s*tier/i.test(packName)) return 3;
  if (/2\s*tier/i.test(packName)) return 2;
  if (/single/i.test(packName)) return 1;
  return 1;
};

const makeDiameterDefaults = (product, count) =>
  Array.from({ length: count }, () => product.diameters?.[0] || { label: "", extra: 0 });

const getProductFlavours = (product, defaultFlavours) => product.flavours || defaultFlavours;
const getProductFillings = (product) => product.fillings || [];
const getProductDiameters = (product) => product.diameters || [];
const getDiameterValue = (diam) => {
  const raw = diam?.label ?? diam;
  return Number(raw ?? 0);
};
const getAllowedDiameters = (product, tierIndex, selectedDiameters) => {
  const options = getProductDiameters(product);
  if (tierIndex === 0) return options;
  const previous = selectedDiameters?.[tierIndex - 1];
  const minValue = getDiameterValue(previous);
  return options.filter((option) => getDiameterValue(option) > minValue);
};

export default function AddItemModal({ products = [], flavours = [], darkMode = false, onClose, onAdd }) {
  const [productId, setProductId] = useState(products[0]?.id || "");
  const product = products.find((p) => p.id === productId) || products[0] || { packSizes: [] };
  const [packSize, setPackSize] = useState(product?.packSizes?.[0]?.name || "");
  const [flavour, setFlavour] = useState(getProductFlavours(product, flavours)[0]?.label || "");
  const [filling, setFilling] = useState(getProductFillings(product)[0]?.label || "");
  const [selectedDiameters, setSelectedDiameters] = useState(makeDiameterDefaults(product, getTierCount(packSize)));
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const p = products.find((p) => p.id === productId) || products[0] || { packSizes: [] };
    setPackSize(p?.packSizes?.[0]?.name || "");
    setFlavour(getProductFlavours(p, flavours)[0]?.label || "");
    setFilling(getProductFillings(p)[0]?.label || "");
    setSelectedDiameters(makeDiameterDefaults(p, getTierCount(p?.packSizes?.[0]?.name || "")));
  }, [productId, products, flavours]);

  useEffect(() => {
    if (!product?.packSizes?.length) return;
    const pack = product.packSizes.find((ps) => ps.name === packSize) || product.packSizes[0];
    if (!product.diameters?.length) {
      setSelectedDiameters([]);
      return;
    }
    setSelectedDiameters(makeDiameterDefaults(product, getTierCount(pack.name)));
  }, [packSize, product]);

  const imgSrc = product?.packSizes?.find((ps) => ps.name === packSize)?.img || product?.packSizes?.[0]?.img || "";

  const applyAdd = () => {
    if (!product) return;
    onAdd({
      id: product.id,
      title: product.title,
      selectedPackSize: packSize,
      selectedFlavour: flavour,
      selectedFilling: filling || undefined,
      selectedDiameters: selectedDiameters.map((d) => d.label),
      quantity: Number(quantity) || 1,
    });
  };

  const handleProductChange = (val) => {
    setProductId(val);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-lg rounded-2xl p-6 shadow-2xl ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
      >
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-black uppercase">Add Item</h3>
          <button onClick={onClose} className={`h-8 w-8 rounded-full border flex items-center justify-center ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>×</button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3 flex items-center justify-center">
            {imgSrc ? (
              <img src={imgSrc} alt={product.title} className="rounded-xl object-cover h-40 w-full" />
            ) : (
              <div className={`h-40 w-full rounded-xl flex items-center justify-center border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>No image</div>
            )}
          </div>

          <div className="md:w-2/3 grid gap-3">
            <div>
              <label className="text-[10px] uppercase font-black opacity-70">Product</label>
              <select value={productId} onChange={(e) => handleProductChange(e.target.value)} className={`w-full mt-2 rounded-2xl border-2 px-4 py-3 outline-none ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`}>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-black opacity-70">Pack size</label>
              <select value={packSize} onChange={(e) => setPackSize(e.target.value)} className={`w-full mt-2 rounded-2xl border-2 px-4 py-3 outline-none ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`}>
                {product?.packSizes?.map((ps) => (
                  <option key={ps.name} value={ps.name}>
                    {ps.name} — ${ps.price}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-black opacity-70">Flavour</label>
              <select value={flavour} onChange={(e) => setFlavour(e.target.value)} className={`w-full mt-2 rounded-2xl border-2 px-4 py-3 outline-none ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`}>
                {getProductFlavours(product, flavours).map((f) => (
                  <option key={f.label} value={f.label}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            {product.fillings?.length > 0 && (
              <div>
                <label className="text-[10px] uppercase font-black opacity-70">Filling</label>
                <select value={filling} onChange={(e) => setFilling(e.target.value)} className={`w-full mt-2 rounded-2xl border-2 px-4 py-3 outline-none ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`}>
                  {getProductFillings(product).map((fill) => (
                    <option key={fill.label} value={fill.label}>
                      {fill.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {product.diameters?.length > 0 && (
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-black opacity-70">Cake Diameters</label>
                <div className="grid gap-3">
                  {Array.from({ length: getTierCount(packSize) }, (_, tierIndex) => (
                    <div key={tierIndex}>
                      <div className="text-xs font-black uppercase opacity-60 mb-1">Tier {tierIndex + 1}</div>
                      <select
                        value={selectedDiameters[tierIndex]?.label || getProductDiameters(product)[0]?.label || ""}
                        onChange={(e) => {
                          const selected = getProductDiameters(product).find((d) => String(d.label) === e.target.value);
                          if (!selected) return;
                          setSelectedDiameters((prev) => {
                            const base = [...(prev || makeDiameterDefaults(product, getTierCount(packSize)))];
                            base[tierIndex] = selected;
                            for (let nextTier = tierIndex + 1; nextTier < base.length; nextTier += 1) {
                              const allowed = getAllowedDiameters(product, nextTier, base);
                              base[nextTier] = allowed[0] || { label: "", extra: 0 };
                            }
                            return base;
                          });
                        }}
                        className={`w-full rounded-2xl border-2 px-4 py-3 outline-none ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`}
                      >
                        {getAllowedDiameters(product, tierIndex, selectedDiameters).map((diam) => (
                          <option key={diam.label} value={diam.label}>
                            {diam.label}" {diam.extra > 0 ? `(+ $${diam.extra})` : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="text-[10px] uppercase font-black opacity-70">Quantity</label>
              <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className={`w-full mt-2 rounded-2xl border-2 px-4 py-3 outline-none ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`} />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className={`rounded-2xl border px-6 py-2 ${darkMode ? "border-gray-700" : "border-gray-200"}`}>Cancel</button>
          <button onClick={applyAdd} className="rounded-2xl bg-pink-500 px-6 py-2 text-white font-black">Add to cart</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
