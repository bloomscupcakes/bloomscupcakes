import { motion } from "framer-motion";

export default function OrderEditModal({
  order,
  onClose,
  onSave,
  isBusy,
  statusOptions,
  products,
  flavours,
  updateCustomerField,
  updateFulfillmentField,
  updateOrderField,
  updateRootField,
  updateOrderItemField,
  addItem,
  removeItem,
}) {
  const contactOptions = ["Email", "Phone", "Text"];

  const getProductById = (productId) => products.find((product) => product.id === productId) || products[0];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.form
        onSubmit={onSave}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] bg-white p-6 shadow-2xl dark:bg-gray-950 dark:text-white"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight">Edit Order</h2>
            <p className="text-sm opacity-60 mt-1">Order ID: {order.id}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-lg font-black text-gray-700 transition hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          >
            ×
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="space-y-4 rounded-[2rem] border border-gray-200 p-5 dark:border-gray-700">
            <h3 className="text-xs font-black uppercase text-pink-500 tracking-widest">Customer</h3>
            <label className="block text-[10px] uppercase font-black opacity-70">Name</label>
            <input
              value={order.customer?.name || ""}
              onChange={(e) => updateCustomerField("name", e.target.value)}
              className="w-full rounded-2xl border-2 px-4 py-3 outline-none dark:bg-gray-900"
            />
            <label className="block text-[10px] uppercase font-black opacity-70">Email</label>
            <input
              value={order.customer?.email || ""}
              onChange={(e) => updateCustomerField("email", e.target.value)}
              className="w-full rounded-2xl border-2 px-4 py-3 outline-none dark:bg-gray-900"
            />
            <label className="block text-[10px] uppercase font-black opacity-70">Phone</label>
            <input
              value={order.customer?.phone || ""}
              onChange={(e) => updateCustomerField("phone", e.target.value)}
              className="w-full rounded-2xl border-2 px-4 py-3 outline-none dark:bg-gray-900"
            />
            <label className="block text-[10px] uppercase font-black opacity-70">Preferred Contact Method</label>
            <select
              value={order.customer?.contactPreference || ""}
              onChange={(e) => updateCustomerField("contactPreference", e.target.value)}
              className="w-full rounded-2xl border-2 px-4 py-3 outline-none dark:bg-gray-900"
            >
              <option value="" disabled>Select method</option>
              {contactOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </section>

          <section className="space-y-4 rounded-[2rem] border border-gray-200 p-5 dark:border-gray-700">
            <h3 className="text-xs font-black uppercase text-pink-500 tracking-widest">Fulfillment</h3>
            <label className="block text-[10px] uppercase font-black opacity-70">Method</label>
            <select
              value={order.fulfillment?.method || "pickup"}
              onChange={(e) => updateFulfillmentField("method", e.target.value)}
              className="w-full rounded-2xl border-2 px-4 py-3 outline-none dark:bg-gray-900"
            >
              <option value="pickup">Pickup</option>
              <option value="delivery">Delivery</option>
            </select>
            <label className="block text-[10px] uppercase font-black opacity-70">Address</label>
            <input
              value={order.fulfillment?.address || ""}
              onChange={(e) => updateFulfillmentField("address", e.target.value)}
              className="w-full rounded-2xl border-2 px-4 py-3 outline-none dark:bg-gray-900"
            />
            <label className="block text-[10px] uppercase font-black opacity-70">Delivery Fee</label>
            <input
              type="number"
              step="0.01"
              value={order.fulfillment?.deliveryFee || "0.00"}
              onChange={(e) => updateFulfillmentField("deliveryFee", e.target.value)}
              className="w-full rounded-2xl border-2 px-4 py-3 outline-none dark:bg-gray-900"
            />
          </section>
        </div>

        <section className="mt-6 rounded-[2rem] border border-gray-200 p-5 dark:border-gray-700">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xs font-black uppercase text-pink-500 tracking-widest">Order metadata</h3>
              <p className="text-[10px] opacity-60">These fields are stored directly on the record.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <label className="text-[10px] uppercase font-black opacity-70">Status</label>
              <select
                value={order.status || "new"}
                onChange={(e) => updateRootField("status", e.target.value)}
                className="rounded-2xl border-2 px-4 py-3 outline-none dark:bg-gray-900"
              >
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
          <label className="block text-[10px] uppercase font-black opacity-70">Created On</label>
          <input
            type="datetime-local"
            value={order.createdAt || ""}
            onChange={(e) => updateRootField("createdAt", e.target.value)}
            className="w-full rounded-2xl border-2 px-4 py-3 outline-none dark:bg-gray-900"
          />
        </section>

        <section className="mt-6 space-y-5 rounded-[2rem] border border-gray-200 p-5 dark:border-gray-700">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xs font-black uppercase text-pink-500 tracking-widest">Items</h3>
            <button
              type="button"
              onClick={addItem}
              className="rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-pink-700 transition hover:bg-pink-100"
            >
              + Add item
            </button>
          </div>

          {!order.order?.items?.length ? (
            <div className="rounded-2xl border border-dashed border-gray-200 p-6 text-sm opacity-70 dark:border-gray-700">
              No items in this order yet.
            </div>
          ) : (
            order.order.items.map((item, index) => {
              const selectedProduct = getProductById(item.productId);
              return (
                <div key={index} className="space-y-3 rounded-2xl border border-gray-100 p-4 dark:border-gray-800">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="text-[10px] uppercase font-black opacity-70">Product</label>
                    <select
                      value={item.productId || selectedProduct.id}
                      onChange={(e) => updateOrderItemField(index, "productId", e.target.value)}
                      className="w-full rounded-2xl border-2 px-4 py-3 outline-none dark:bg-gray-900"
                    >
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>{product.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="text-[10px] uppercase font-black opacity-70">Pack size</label>
                    <select
                      value={item.packSize || selectedProduct.packSizes?.[0]?.name}
                      onChange={(e) => updateOrderItemField(index, "packSize", e.target.value)}
                      className="w-full rounded-2xl border-2 px-4 py-3 outline-none dark:bg-gray-900"
                    >
                      {selectedProduct.packSizes.map((pack) => (
                        <option key={pack.name} value={pack.name}>{pack.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="text-[10px] uppercase font-black opacity-70">Flavour</label>
                    <select
                      value={item.flavour || flavours[0]?.label}
                      onChange={(e) => updateOrderItemField(index, "flavour", e.target.value)}
                      className="w-full rounded-2xl border-2 px-4 py-3 outline-none dark:bg-gray-900"
                    >
                      {flavours.map((flavour) => (
                        <option key={flavour.label} value={flavour.label}>{flavour.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="text-[10px] uppercase font-black opacity-70">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity || 1}
                      onChange={(e) => updateOrderItemField(index, "quantity", Number(e.target.value))}
                      className="w-full rounded-2xl border-2 px-4 py-3 outline-none dark:bg-gray-900"
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="text-[10px] uppercase font-black opacity-70">Unit price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={item.pricePerUnit || 0}
                      onChange={(e) => updateOrderItemField(index, "pricePerUnit", Number(e.target.value))}
                      className="w-full rounded-2xl border-2 px-4 py-3 outline-none dark:bg-gray-900"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-left text-[10px] uppercase font-black tracking-widest text-red-600 transition hover:text-red-800"
                  >
                    Remove item
                  </button>
                </div>
              );
            })
          )}
        </section>

        <section className="mt-6 rounded-[2rem] border border-gray-200 p-5 dark:border-gray-700">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[10px] uppercase font-black opacity-70">Subtotal</label>
              <input
                type="number"
                step="0.01"
                value={order.order?.subtotal || 0}
                onChange={(e) => updateOrderField("subtotal", e.target.value)}
                className="w-full rounded-2xl border-2 px-4 py-3 outline-none dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-black opacity-70">Surcharge</label>
              <input
                type="number"
                step="0.01"
                value={order.order?.surcharge || 0}
                onChange={(e) => updateOrderField("surcharge", e.target.value)}
                className="w-full rounded-2xl border-2 px-4 py-3 outline-none dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-black opacity-70">Tax</label>
              <input
                type="number"
                step="0.01"
                value={order.order?.tax || 0}
                onChange={(e) => updateOrderField("tax", e.target.value)}
                className="w-full rounded-2xl border-2 px-4 py-3 outline-none dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-black opacity-70">Total</label>
              <input
                type="number"
                step="0.01"
                value={order.order?.total || 0}
                onChange={(e) => updateOrderField("total", e.target.value)}
                className="w-full rounded-2xl border-2 px-4 py-3 outline-none dark:bg-gray-900"
              />
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-[10px] uppercase font-black opacity-70">Pickup Date</label>
            <input
              type="date"
              value={order.order?.pickupDate || ""}
              onChange={(e) => updateOrderField("pickupDate", e.target.value)}
              className="w-full rounded-2xl border-2 px-4 py-3 outline-none dark:bg-gray-900"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-black opacity-70">Special Notes</label>
            <textarea
              rows="3"
              value={order.order?.notes || ""}
              onChange={(e) => updateOrderField("notes", e.target.value)}
              className="w-full rounded-2xl border-2 px-4 py-3 outline-none dark:bg-gray-900"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-gray-300 px-6 py-3 text-sm uppercase font-black transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isBusy}
            className="rounded-2xl bg-pink-500 px-6 py-3 text-sm uppercase font-black text-white transition hover:bg-pink-600 disabled:opacity-40"
          >
            {isBusy ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}
