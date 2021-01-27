import { wishlistProductsVar, cartProductsVar } from '../apollo/client/cache';

export function toggleWishlist(product) {
  console.log("....",product)
  if (wishlistProductsVar().includes(product)) {
    const newWishlist = wishlistProductsVar().filter((item) => item.id != product.id);
    wishlistProductsVar(newWishlist);
  } else wishlistProductsVar([...wishlistProductsVar(), product]);
}

export function toggleCart(product) {
  console.log(">..pro",product)
  if (cartProductsVar().includes(product)) {
    const newCartList = cartProductsVar().filter((item) => item.id != product.id);
    cartProductsVar(newCartList);
  } else cartProductsVar([...cartProductsVar(), product]);
}
