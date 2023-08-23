// console.log(productData)

for (let i = 0; i < productData.length; i++) {
  productData[i].id = i;
}

const createRatingElement = (rating) => {
  const ratingContainer = document.createElement('div');
  ratingContainer.classList.add('rating-container');

  const ratingNumber = document.createElement('span');
  ratingNumber.classList.add('rating-number')
  const ratingNumberText = document.createTextNode(rating);
  ratingNumber.appendChild(ratingNumberText);

  const ratingContainerUl = document.createElement('ul');
  ratingContainer.appendChild(ratingContainerUl);
  ratingContainer.appendChild(ratingNumber);

  for (let i = 1; i <= 5; i++) {
    const ratingLi = document.createElement('li');
    if (i <= rating) {
      ratingLi.classList.add('active')
    }
    ratingLi.innerHTML = `
      <?xml version="1.0" encoding="iso-8859-1"?>
      <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
      <svg fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
          viewBox="0 0 473.486 473.486" xml:space="preserve">
      <polygon points="473.486,182.079 310.615,157.952 235.904,11.23 162.628,158.675 0,184.389 117.584,299.641 91.786,462.257 
        237.732,386.042 384.416,460.829 357.032,298.473 "/>
      </svg>
    `
    ratingContainerUl.appendChild(ratingLi);
  }

  return ratingContainer;
}

const renderProducts = (productData, filePath = './assets') => {
  const productsUl = document.querySelector('.producst-list-ul')
  productsUl.innerHTML = ''

  for (let i = 0; i < productData.length; i++) {
    /*creation of li element*/
    const producstLi = document.createElement('li');
    producstLi.classList.add('products-list-li');

    /*creation of product container element*/
    const productContainer = document.createElement('div')
    productContainer.setAttribute('class', 'product-container')
    productContainer.setAttribute('data-id', i)

    /*createion of product image container*/
    const productImageContainer = document.createElement('div');
    productImageContainer.classList.add('product-image');

    const productImage = document.createElement('img');
    productImage.setAttribute('src', `${filePath}/image/${productData[i].imageName}`);
    productImage.setAttribute('alt', 'product image');
    productImageContainer.appendChild(productImage);

    /*creation of product description*/
    const productDescription = document.createElement('div');
    productDescription.classList.add('product-description');

    //price div tag cration
    const priceContainer = document.createElement('div');
    priceContainer.classList.add('price');
    const priceElement = document.createElement('ins');
    priceContainer.appendChild(priceElement)
    if (productData[i].price.new) {

      const priceText = document.createTextNode(`$${productData[i].price.new}`);

      const oldPriceElement = document.createElement('del');
      const oldPriceText = document.createTextNode(`$${productData[i].price.standart}`)

      oldPriceElement.appendChild(oldPriceText);
      priceElement.appendChild(priceText);
      priceContainer.appendChild(oldPriceElement);
    } else {
      const priceText = document.createTextNode(`$${productData[i].price.standart}`)
      priceElement.appendChild(priceText)
    }


    const ratingContainer = createRatingElement(productData[i].rating)

    productDescription.appendChild(priceContainer)
    productDescription.appendChild(ratingContainer)

    const productName = document.createElement('div');
    productName.classList.add('product-name');
    const productNameText = document.createTextNode(`${productData[i].productName} - ${productData[i].manufacturer}`)
    productName.appendChild(productNameText);


    const wishlistContainer = document.createElement('div');
    wishlistContainer.classList.add('wishlist');
    if (productData[i].isInWishlist) {
      wishlistContainer.classList.add('active');
    }
    const wishlistImage = document.createElement('img')
    wishlistImage.setAttribute('src', `${filePath}/images/heart.png`)
    wishlistContainer.appendChild(wishlistImage);

    productDescription.appendChild(productName)
    productDescription.appendChild(wishlistContainer);

    productContainer.appendChild(productImageContainer);
    productContainer.appendChild(productDescription);

    producstLi.appendChild(productContainer);
    // producstLi.setAttribute('class', 'products-list-li')
    productsUl.appendChild(producstLi);
  }
  // console.log(productsUl)
}


const filterElements = (event, manufacturer) => {
  let filteredArray;
  if (event.target.checked) {
    filteredArray = [...productData.filter((item, index, array) => {
      return item.manufacturer === event.target.id
    })]
  } else {
    filteredArray = [...productData];
  }
  renderProducts(filteredArray)

  // console.log(filteredArray)
  // console.log(event.target.id)
  // console.log(event, manufacturer)
}


const createFilters = () => {
  const checkboxes = document.querySelectorAll('.category-list-li .category-list-item-container input')
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', (event) => filterElements(event, checkboxes[i].id))
  }
}


createFilters()

renderProducts(productData)

const wishlistButtons = document.querySelectorAll('.product-description .wishlist');

const toggleWishList = (element) => {
  const parentContainerId = element.parentElement.parentElement.getAttribute('data-id')
  const clickedProductObject = productData[parentContainerId]
  const cartElementCount = document.querySelector('.item-container.cart')

  const indexInWishlist = wishlist.findIndex((item, index, array) => {
    return item.id === clickedProductObject.id
  })

  if (indexInWishlist < 0) {
    wishlist.push(clickedProductObject)
  } else {
    wishlist.splice(indexInWishlist, 1)
  }

  cartElementCount.setAttribute('data-count', wishlist.length)

  localStorage.setItem('wishListItems', JSON.stringify(wishlist));

  console.log(wishlist)
  if (element.classList.contains('active')) {
    element.classList.remove('active')
    clickedProductObject.isInWishlist = false
  } else {
    element.classList.add('active')
    clickedProductObject.isInWishlist = true
  }
  console.log(productData)
}

for (let i = 0; i < wishlistButtons.length; i++) {
  wishlistButtons[i].addEventListener('click', () => { toggleWishList(wishlistButtons[i]) })
}
