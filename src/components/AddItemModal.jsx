import { motion } from "framer-motion";
import { useState } from "react";

export default function AddItemModal({ products = [], flavours = [], darkMode = false, onClose, onAdd }) {
  const [productId, setProductId] = useState(products[0]?.id || "");
  const product = products.find(p => p.id === productId) || products[0] || { packSizes: [] };
  const [packSize, setPackSize] = useState(product?.packSizes?.[0]?.name || "");
  const [flavour, setFlavour] = useState(flavours[0]?.label || "");
  const [quantity, setQuantity] = useState(1);
  const imgSrc = product?.packSizes?.find(ps => ps.name === packSize)?.img || product?.packSizes?.[0]?.img || "";

  const applyAdd = () => {
    if (!product) return;
    onAdd({
      id: product.id,
      title: product.title,
      selectedPackSize: packSize,
      selectedFlavour: flavour,
      quantity: Number(quantity) || 1,
    });
  };

  const handleProductChange = (val) => {
    setProductId(val);
    const p = products.find(p => p.id === val);
    setPackSize(p?.packSizes?.[0]?.name || "");
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
                {products.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-black opacity-70">Pack size</label>
              <select value={packSize} onChange={(e) => setPackSize(e.target.value)} className={`w-full mt-2 rounded-2xl border-2 px-4 py-3 outline-none ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`}>
                {product?.packSizes?.map(ps => <option key={ps.name} value={ps.name}>{ps.name} — ${ps.price}</option>)}
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-black opacity-70">Flavour</label>
              <select value={flavour} onChange={(e) => setFlavour(e.target.value)} className={`w-full mt-2 rounded-2xl border-2 px-4 py-3 outline-none ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`}>
                {flavours.map(f => <option key={f.label} value={f.label}>{f.label}</option>)}
              </select>
            </div>

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
