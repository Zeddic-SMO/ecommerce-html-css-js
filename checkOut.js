const retrieveData = localStorage.getItem("customerOrder")
const customerOrders = JSON.parse(retrieveData)
// console.log(customerOrders, "BEND U")

const tableBody = document.getElementsByTagName("tbody")[0]
// console.log(tableBody, "body")
// const tableRow = document.createElement("tr")
let totalQty = 0
let totalPrice = 0

let tableColumn = ""
customerOrders.map((order) => {
  const { title, price, qty } = order
  totalQty += qty
  totalPrice += price

  tableColumn += `<tr>
                    <td class='title'>${title}</td>
                    <td class='qty' style="text-align:center">${qty}</td> 
                    <td class='price' style='text-align:center'><b>$ ${price}</b></td>   
                   <br/>           
                 </tr>           
                    `
})

// tableRow.innerHTML = tableColumn
// console.log(tableColumn, "row")
tableBody.innerHTML = tableColumn
// tableBody.appendChild(tableColumn)

// adding total
const totalPriceEl = document.getElementById("total")
totalPriceEl.textContent = totalPrice

// number in the cart
const cartItemsCount = document.getElementsByClassName("number-cart-items")[0]
cartItemsCount.textContent = totalQty
// console.log(totalPrice, totalQty)

// Redirecting to the payment GateWay
const payNowBtn = document.getElementsByClassName("payNow")[0]
payNowBtn.addEventListener("click", () => {
  window.open("./gateWay.html", "_self")
})
