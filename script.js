// Fetch data from the API
const fetchData = async () => {
  const storeApi = "https://fakestoreapi.com/products"
  const response = await fetch(storeApi)
  const data = await response.json()
  render(data)
}
fetchData()

// check is page is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", render)
} else {
  render()
}

// Render after page document is ready

function render(data) {
  let productItem = ""
  data.map((item) => {
    const { id, title, price, category, image } = item

    productItem += `
        <div class="product" key='${id}'>

            <div class="image">
                <img src="${image}" alt="Product">
            </div>

            <div class="product-details"> 

                <p class="categoryPrice">
                    <span><b>Category: </b><span class="category">${category.toUpperCase()}</span></span>
                    <span class="price"><b>$</b>${price}</span>
                </p>

                <div><b>Title: </b><span class="title">${title}</span></div>
                <button class="add-to-cart-btn">Add to Cart</button>
            
            </div>
           
            
        </div>
        `
  })
  //   console.log(productItem)
  document.getElementsByClassName("products-container")[0].innerHTML =
    productItem

  // Add to Cart Button
  const addToCartButtons = document.getElementsByClassName("add-to-cart-btn")
  for (let button of addToCartButtons) {
    button.addEventListener("click", addToCart)
  }

  // cart Basket
  const navChartButton = document.getElementById("navBar")
  navChartButton.addEventListener("click", () => {
    const cartBasket = document.getElementById("cartSection")
    cartBasket.classList.toggle("open")

    // console.log(document.getElementsByClassName("cartSection")[0])
  })
}

function addToCart(e) {
  const productElement = e.target.parentElement

  //   Collecting the items
  const image = productElement.parentElement.getElementsByTagName("img")[0].src

  const category =
    productElement.getElementsByClassName("category")[0].textContent

  const price = productElement
    .getElementsByClassName("price")[0]
    .textContent.replace("$", "")

  const title = productElement.getElementsByClassName("title")[0].textContent

  //   console.log(image, category, price, title)
  updateCartList(image, category, price, title)
}

function updateCartList(image, category, price, title) {
  console.log(image, category, price, title)

  const checkTitleElement = document.getElementsByClassName("item-title")
  for (let checkTitle of checkTitleElement) {
    if (checkTitle.textContent === title) {
      alert("Item Already in Cart!")
      return
    }
  }

  const tbody = document.getElementsByTagName("tbody")[0]
  let tr = document.createElement("tr")

  let td = `
  <td style='width:40%; padding:0px 4px'>
  <span class='productImg'><img src='${image}' alt='product item' width='35px' height='35px'/></span>
   <span class='item-title'>${title}</span>
   </td>  
  <td style='width:25%; padding:0px 4px'>${category}</td> 
   <td style='width:10%; padding:0px 4px'><input type='number' value='1'style='width:100%' class="qtyValues"/></td>  
  <td style='width:10%'><b>$</b>${price}</td>
  <td style='width:20%'><button class='remove-cartItem'>REMOVE</button></td>
  `
  tr.innerHTML = td

  tbody.appendChild(tr)

  // updateListNumber
  updateCartListNumber()
}

function updateCartListNumber() {
  const tBody = document.getElementsByTagName("tbody")[0]

  const qtyEls = tBody.getElementsByClassName("qtyValues")

  let totalQty = 0

  for (let qty of qtyEls) {
    totalQty += parseInt(qty.value)
  }

  document.getElementsByClassName("number-cart-items")[0].textContent = totalQty

  // Remove from Cart Button event button
  const removeFromCartButtons = tBody.getElementsByClassName("remove-cartItem")
  for (let removeBtn of removeFromCartButtons) {
    removeBtn.addEventListener("click", removeFromCart)
  }
}

// Remove from Cart Function triggered by the event button
function removeFromCart(e) {
  e.target.parentElement.parentElement.remove()
  updateCartListNumber()
}
