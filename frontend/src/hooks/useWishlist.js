// Wishlist hook — persists to localStorage
export function useWishlist() {
  const getWishlist = () => {
    try { return JSON.parse(localStorage.getItem('sharadha_wishlist') || '[]'); } catch { return []; }
  };

  const isWishlisted = (productId) => getWishlist().some(p => p.id === productId);

  const toggleWishlist = (product) => {
    const list = getWishlist();
    const exists = list.some(p => p.id === product.id);
    const updated = exists ? list.filter(p => p.id !== product.id) : [...list, product];
    localStorage.setItem('sharadha_wishlist', JSON.stringify(updated));
    return !exists; // returns true if added, false if removed
  };

  const getCount = () => getWishlist().length;

  return { getWishlist, isWishlisted, toggleWishlist, getCount };
}
