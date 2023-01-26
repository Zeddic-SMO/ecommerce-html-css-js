// FLUTTERWAVE INTEGRATION

const submitToGateWay = document.getElementById("submitToGateWay")
submitToGateWay.addEventListener("click", makePayment)

function makePayment() {
  // collecting user data
  const userEmail = document.getElementById("email").value
  const phone = document.getElementById("phone").value
  const fullName = document.getElementById("fullName").value

  FlutterwaveCheckout({
    public_key: "FLWPUBK_TEST-b78fa12fba782df050f26d181c64ad91-X",
    tx_ref: "ZeddicStore",
    amount: totalPrice,
    currency: "NGN",
    redirect_url: "https://ecommerce-html-css-js.netlify.app/",
    customer: {
      email: userEmail,
      phone_number: phone,
      name: fullName,
    },
  })
}
