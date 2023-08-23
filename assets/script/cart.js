const renderWishlist = () => {
  const wishlistItems = JSON.parse(localStorage.getItem('wishListItems'))
  renderProducts(wishlistItems, '../assets')
}