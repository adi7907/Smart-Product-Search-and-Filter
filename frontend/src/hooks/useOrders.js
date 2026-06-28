// Order management hook — persists to localStorage
export function useOrders() {
  const getOrders = () => {
    try { return JSON.parse(localStorage.getItem('sharadha_orders') || '[]'); } catch { return []; }
  };

  const saveOrder = (cart, total, address, paymentMethod, coupon, discount) => {
    const orders = getOrders();
    const orderId = `SHR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 90000) + 10000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, image_url: i.image_url })),
      subtotal: cart.reduce((s, i) => s + i.price * i.quantity, 0),
      deliveryFee: total >= 300 ? 0 : 40,
      discount: discount || 0,
      gst: Math.round(total * 0.05),
      total,
      address,
      paymentMethod,
      coupon: coupon || null,
      status: 'placed', // placed | preparing | out_for_delivery | delivered
    };
    const updated = [newOrder, ...orders];
    localStorage.setItem('sharadha_orders', JSON.stringify(updated));
    return newOrder;
  };

  return { getOrders, saveOrder };
}
