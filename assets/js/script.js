"sterct mode";

// Element slected
const opcText = document.querySelectorAll(".opc-text");
const sliderBody = document.querySelectorAll(".slider-body");
const sliderFooter = document.querySelectorAll(".slider-footer");
const sliderHeaderFeat = document.querySelectorAll(".slider-feat .headers");
const sliderFooterFeat = document.querySelectorAll(".slider-feat .footer");
const sliderHeaderGears = document.querySelectorAll(".slider-gears .headers");
const sliderFooterGears = document.querySelectorAll(".slider-gears .footer");
const GoToTop = document.querySelector("#go-to-top");
const list = document.querySelector(".header header .list");
const cartItems = document.querySelector("#cart-items");
const iconX = document.querySelector("#icon-x");
const iconXCart = document.querySelector("#icon-x-cart");
const iconMenu = document.querySelector("#icon-menu");
const iconCart = document.querySelector("#icon-cart");
const overlay = document.querySelector(".overlay");
const items = document.querySelector(
  ".header header .users .cart-items .items"
);
const total = document.querySelector(
  ".header header .users .cart-items .items-total"
);

//////////////////////////////////////
// (Show/Hide) Menu

const showAndHideMenu = function (iCart, iMenu, iXCart, iX, oLay) {
  iCart.addEventListener("click", () => {
    cartItems.classList.add("active-cart");
    cartItems.style.right = "0%";
  });

  iMenu.addEventListener("click", () => {
    list.classList.add("active-list");
    overlay.style.display = "block";
    list.style.right = "0";
  });

  iXCart.addEventListener("click", () => {
    cartItems.classList.remove("active-cart");
    cartItems.style.right = "-100%";
  });

  iX.addEventListener("click", () => {
    list.classList.remove("active-list");
    overlay.style.display = "none";
    list.style.right = "-50%";
  });
  oLay.addEventListener("click", () => {
    list.classList.remove("active-list");
    overlay.style.display = "none";
    list.style.right = "-50%";
    cartItems.style.right = "-50%";
  });
};
showAndHideMenu(iconCart, iconMenu, iconXCart, iconX, overlay);

//////////////////////////////////////
// Slider Component

const sliders = {
  hero: document.querySelectorAll(".slider"),
  featured: document.querySelectorAll(".slider-feat"),
  gears: document.querySelectorAll(".slider-gears"),
};

const btns = {
  left: document.querySelectorAll(".slider-icon-left"),
  right: document.querySelectorAll(".slider-icon-right"),
  leftFeatured: document.querySelectorAll(".slider-icon-left-feat"),
  rightFeatured: document.querySelectorAll(".slider-icon-right-feat"),
  leftGears: document.querySelectorAll(".slider-icon-left-gears"),
  rightGears: document.querySelectorAll(".slider-icon-right-gears"),
};

const pageNumbers = {
  main: document.querySelectorAll(".page-number"),
  featured: document.querySelectorAll(".page-number-feat"),
  gears: document.querySelectorAll(".page-number-gears"),
};

const createSlider = function (
  slides,
  buttons,
  numbers,
  header,
  footer,
  opctElements
) {
  let curSlide = 0;
  const maxSlide = slides.length;

  // Update Page Numbers Function
  const updatePageNumbers = function () {
    numbers.forEach((pageNumber, index) => {
      const spanOne = document.createElement("span");
      const spanTwo = document.createElement("span");

      spanOne.textContent = index + 1;
      spanTwo.textContent = maxSlide;

      pageNumber.innerHTML = "";

      if (index === curSlide) {
        spanOne.classList.add("active");
        spanOne.textContent = curSlide + 1;
      }

      pageNumber.appendChild(spanOne);
      pageNumber.appendChild(spanTwo);
    });
  };

  // Go To Slide Function
  const goToSlide = function (slide, slider) {
    slider.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
    // Update Page Numbers Function
    updatePageNumbers();
  };
  // Next Slide Function
  const nextSlide = function (slider, buttons) {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;
    // Go To Slide Function
    goToSlide(curSlide, slider);
    // Animation Function
    animation(header, footer, opctElements);
  };

  // Previous Slide Function
  const prevSlide = function (slider, buttons) {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;
    // Go To Slide Function
    goToSlide(curSlide, slider);
    // Animation Function
    animation(header, footer, opctElements);
  };

  // Animation Function
  const animation = function (headerElements, footerElements, opctElement) {
    headerElements.forEach((text, index) => {
      if (index === curSlide) {
        text.classList.remove("animation");
        text.classList.add("animation");
      } else {
        text.classList.remove("animation");
      }
    });
    footerElements.forEach((text, index) => {
      if (index === curSlide) {
        text.classList.remove("animation");
        text.classList.add("animation");
      } else {
        text.classList.remove("animation");
      }
    });
    opctElement.forEach((text, index) => {
      if (index === curSlide) {
        text.classList.remove("animation");
        text.classList.add("animation");
      } else {
        text.classList.remove("animation");
      }
    });
  };

  // Initialize Function
  const init = function (slider, header, footer) {
    // Go To Slide Function
    goToSlide(0, slider);
    // Animation Function
    animation(header, footer, opctElements);
  };

  init(slides, header, footer);

  buttons.right.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Next Slide Function
      nextSlide(slides, buttons);
    });
  });
  buttons.left.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Previous Slide Function
      prevSlide(slides, buttons);
    });
  });

  // Arrow Keyboards Functions
  const sections = document.querySelectorAll("section");
  const arrowKey = function (sections) {
    // Section Visible
    window.addEventListener("scroll", function () {
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight) {
          section.classList.add("visible");
        } else {
          section.classList.remove("visible");
        }
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const activeSection = document.querySelector("section.visible");
        if (activeSection) {
          const activeSlider = sliders[activeSection.id];
          const activeButtons = btns[activeSection.id];
          if (activeSlider) {
            if (e.key === "ArrowRight") {
              nextSlide(activeSlider, activeButtons);
            } else if (e.key === "ArrowLeft") {
              prevSlide(activeSlider, activeButtons);
            }
          } else {
            console.log("No active slider found");
          }
        }
      }
    });
  };
  arrowKey(sections);
};

createSlider(
  sliders.hero,
  { left: btns.left, right: btns.right },
  pageNumbers.main,
  sliderBody,
  sliderFooter,
  opcText
);
createSlider(
  sliders.featured,
  { left: btns.leftFeatured, right: btns.rightFeatured },
  pageNumbers.featured,
  sliderHeaderFeat,
  sliderFooterFeat,
  opcText
);
createSlider(
  sliders.gears,
  { left: btns.leftGears, right: btns.rightGears },
  pageNumbers.gears,
  sliderHeaderGears,
  sliderFooterGears,
  opcText
);

//////////////////////////////////////
// Add To Cart

let productsArray = [];

let images = document.querySelectorAll("#imgs");
let imagesArray = Array.from(images);

// Add Images To Products Array Function
const addImagesToProductsArray = function (images) {
  images.forEach((image, i) => {
    let product = {
      name: image.getAttribute("alt"),
      price: document.querySelectorAll("#price")[i].innerHTML,
      image: image.src,
    };
    productsArray.push(product);
  });
};

addImagesToProductsArray(imagesArray);

const iconAddToCart = document.querySelectorAll("#add-plus");
const iconAddToCartArray = Array.from(iconAddToCart);

// Icon Add Products To  Cart Array Function
const iconAddProductsToCartArray = function (iconCart) {
  iconCart.forEach((add, i) => {
    add.addEventListener("click", () => {
      createItemsCart(productsArray, i);
      controlItemsCart();
      add.style.pointerEvents = "none";
    });
  });
};
iconAddProductsToCartArray(iconAddToCartArray);

// Create Items Cart Function
const createItemsCart = function (array, index) {
  const item = `
  <div class="imgs">
    <img src=${array[index].image} alt="mous-1" />
  </div>
  <div class="item-info">
    <div class="item-name">
      <h5>${array[index].name}</h5>
      <span class="price">$ ${array[index].price}</span>
    </div>
    <div class="control">
      <i id="icon-x-item-${index}" class="fa-solid fa-x icon-x"></i>
      <div class="quantity">
        <i id="qua-minus-${index}" class="fa-solid fa-minus"></i>
        <span id="qua-counter-${index}" class='qua-counter'>1</span>
        <i id="qua-plus-${index}" class="fa-solid fa-plus"></i>
      </div>
    </div>
  </div>
  `;
  const newItem = document.createElement("div");
  newItem.className = "item";
  newItem.id = `item-${index}`;
  newItem.innerHTML = item;
  items.prepend(newItem);
  // Number Of Products Function
  numberOfProducts(index);
  // Total Price Function
  totalPrice(array[index].price);
};

// Number Of Products Function
const numberOfProducts = function (i) {
  let quaMinus = document.querySelector(`#item-${i} #qua-minus-${i}`);
  let quaPlus = document.querySelector(`#item-${i} #qua-plus-${i}`);
  let quaCounter = document.querySelector(`#item-${i} #qua-counter-${i}`);
  let iconXItem = document.querySelector(`#item-${i} #icon-x-item-${i}`);
  let price = productsArray[i].price;

  quaMinus.addEventListener("click", (e) => {
    if (quaCounter.innerHTML !== "1") {
      quaCounter.innerHTML--;
      // Total Price Function
      totalPrice(-price);
    } else {
      e.preventDefault();
    }
  });

  quaPlus.addEventListener("click", () => {
    quaCounter.innerHTML++;
    // Total Price Function
    totalPrice(price);
  });

  iconXItem.addEventListener("click", () => {
    let item = document.querySelector(`#item-${i}`);
    item.remove();
    totalPrice(-price * parseInt(quaCounter.innerHTML));
    let spanCart = document.querySelector("#counter");
    spanCart.innerHTML--;
    emptyItems();
  });
};
// Control Items Cart Function
const controlItemsCart = function () {
  let spanCart = document.querySelector("#counter");
  spanCart.classList.add("activ");
  spanCart.innerHTML++;

  document.querySelector(
    ".header header .users .cart-items .body"
  ).style.display = "none";
  items.classList.add("activ");
  total.classList.add("activ");
};

// Empty Items Cart Function
const emptyItems = function () {
  let spanCart = document.querySelector("#counter");
  if (spanCart.innerHTML === "0") {
    spanCart.classList.remove("activ");
    document.querySelector(
      ".header header .users .cart-items .body"
    ).style.display = "flex";
    items.classList.remove("activ");
    total.classList.remove("activ");
    iconAddToCartArray.forEach((add) => {
      add.style.pointerEvents = "auto";
    });
  }
};

let prices = 0;
// Total Price Function
const totalPrice = function (price) {
  let prictotal = document.querySelector(".total-price");
  prices += Number(price);
  prictotal.innerHTML = `$ ${prices.toFixed(2)}`;
};

//////////////////////////////////////
// Go To Tob Button

window.addEventListener("scroll", function () {
  if (window.scrollY >= 1000) {
    GoToTop.classList.add("active");
    GoToTop.style.backgroundColor = "var(--min-color)";
  } else {
    GoToTop.classList.remove("active");
  }
});
