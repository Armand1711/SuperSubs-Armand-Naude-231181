// JavaScript code for SuperSubs website
  // Function to handle the sub order creation
  function createSubOrder() {
    const subName = document.getElementById("sub-name").value;
    const baseBread = document.getElementById("base-bread").value;
    const toppings = Array.from(document.querySelectorAll(".topping-checkbox:checked")).map((topping) => topping.value);
    const sauce = document.getElementById("sauce-select").value;
    
    // Calculate the cost based on selected options
    const totalCost = calculateTotalCost(baseBread, toppings, sauce);
  
    // Create a sub order object
    const subOrder = {
      name: subName,
      baseBread: baseBread,
      toppings: toppings,
      sauce: sauce,
      cost: totalCost,
    };
  
    // Store the sub order in local storage
    localStorage.setItem("subOrder", JSON.stringify(subOrder));
  
    // Redirect to the checkout page
    navigateToPage("Pages/checkout.html");
  }
  
  // Function to calculate the total cost of a sub order
  function calculateTotalCost(baseBread, toppings, sauce) {
    // Calculate the cost based on selected options
    let totalCost = 0;
  
    // Add the cost of the base bread
    const baseBreadCost = getBaseBreadCost(baseBread);
    totalCost += baseBreadCost;
  
    // Add the cost of each topping
    toppings.forEach((topping) => {
      const toppingCost = getToppingCost(topping);
      totalCost += toppingCost;
    });
  
    // Add the cost of the sauce
    const sauceCost = getSauceCost(sauce);
    totalCost += sauceCost;
  
    return totalCost;
  }
  
  // Function to get the cost of a base bread
  function getBaseBreadCost(baseBread) {
    
    const baseBreadCosts = {
      "White Bread": 40.99,
      "Wheat Bread": 50.49,
      "Rye Bread": 80.99,
      "Brown Bread": 55.49,
      "Whole Grain Bread": 70.99,
    };
  
    return baseBreadCosts[baseBread] || 0;
  }
  
  // Function to get the cost of a topping
  function getToppingCost(topping) {
    
    const toppingCosts = {
      "Tomato": 4.9,
      "Onion": 3.9,
      "Lettuce": 2.9,
      "Ham": 4.9,
      "Salami": 3.9,
      "Chicken": 2.9,
      "Crispy Chicken": 4.9,
      "Beef Meatballs": 3.9,
      "Pork Meatballs": 2.9,
      "Feta": 4.9,
      "Chedar Cheese": 3.9,
      "Parmesan Cheese": 2.9,
      "Mozzarella Cheese": 4.9,
      "Jalapeno Peppers": 3.9,
      "Pepperoni": 2.9,
      "Pickled Cucumber": 4.9,
      "Bell Pepper": 3.9,
      "Red Onion": 2.9,
      "Olive": 4.9,
      "Spinach": 3.9,
      "Bacon": 2.9,
      "Egg": 4.9,
      "Banana Pepper": 3.9,
    };
  
    return toppingCosts[topping] || 0;
  }
  
  // Function to get the cost of a sauce
  function getSauceCost(sauce) {
    
    const sauceCosts = {
      "Homemade Tomato Sauce": 9.9,
      "Tomato Sauce": 7.9,
      "BBQ Sauce": 14.9,
      "Buffalo Sauce": 9.9,
      "Mustard": 7.9,
      "Mayonnaise": 14.9,
      "Honey Mustard": 7.9,
      "Sweet Chilli": 14.9,
      
    };
  
    return sauceCosts[sauce] || 0;
  }
  
  // Function to load the sub order details on the checkout page
  function loadSubOrderDetails() {
    const subOrder = JSON.parse(localStorage.getItem("subOrder"));
  
    if (subOrder) {
      document.getElementById("sub-name").textContent = subOrder.name;
      document.getElementById("base-bread").textContent = subOrder.baseBread;
      document.getElementById("toppings").textContent = subOrder.toppings.join(", ");
      document.getElementById("sauce").textContent = subOrder.sauce;
      document.getElementById("total-cost").textContent = subOrder.cost.toFixed(2);
    } else {
      // Sub order not found, redirect to build page
      navigateToPage("Pages/build.html");
    }
  }
  
  // Function to apply a coupon code and update the total cost
  function applyCouponCode() {
    const couponCode = document.getElementById("coupon-code").value;
    const subOrder = JSON.parse(localStorage.getItem("subOrder"));
  
    // Dummy coupon codes and their discount percentages
    const couponCodes = {
      "SUPER10": 10,
      "SUBSAVER": 15,
      // Add more coupon codes here...
    };
  
    const discountPercentage = couponCodes[couponCode] || 0;
  
    if (discountPercentage > 0) {
      const discountAmount = (subOrder.cost * discountPercentage) / 100;
      const discountedCost = subOrder.cost - discountAmount;
  
      // Update the total cost on the page
      document.getElementById("total-cost").textContent = discountedCost.toFixed(2);
    } else {
      // Invalid coupon code, show an error message
      document.getElementById("coupon-error").textContent = "Invalid coupon code";
    }
  }
  
  // Function to clear the sub order from local storage
  function clearSubOrder() {
    localStorage.removeItem("subOrder");
  }
  
  // Execute necessary functions based on the current page
  const currentPage = window.location.pathname.split("/").pop();
  
  if (currentPage === "index.html") {
    displaySubsOfTheMonth();
  } else if (currentPage === "Pages/checkout.html") {
    loadSubOrderDetails();
  }
  
  