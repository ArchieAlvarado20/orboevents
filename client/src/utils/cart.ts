const CART_KEY = "ticket_cart";

export const getCart = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (item) => {
  const cart = getCart();

  const existing = cart.find((i) => i.ticketTypeId === item.ticketTypeId);

  if (existing) {
    const updated = cart.map((i) =>
      i.ticketTypeId === item.ticketTypeId
        ? { ...i, quantity: i.quantity + 1 }
        : i,
    );

    saveCart(updated);
    return updated;
  }

  const newCart = [...cart, { ...item, quantity: 1 }];
  saveCart(newCart);
  return newCart;
};
