//Carousel
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    //var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    //   for (i = 0; i < dots.length; i++) {
    //       dots[i].className = dots[i].className.replace(" active", "");
    //   }
    slides[slideIndex - 1].style.display = "block";
    //dots[slideIndex-1].className += " active";
}

//Fetch data
const fetchData = () => {
    fetch("itemList.json")
        .then((response) => response.json())
        .then((data) => {
            appendData(data);
            // product.map((item) => {
            //     console.log(item);
            //     return document.querySelector(".item").innerText = item.name;
            // });
        })
        .catch((error) => {
            console.log(error);
        });
};
//Product Cart
let productInCart = [];

//Append Data
const appendData = (data) => {
    const product = data.product;
    const html = product
        .map((item) => {
            return `<div class="box zone">
        <img
            src="https://s3.ap-southeast-1.amazonaws.com/media.motherhood.co.uk/wp-content/uploads/2021/07/14194126/cocktail1.jpg"
        />
        <div class="detail">
            <h1 id="name" style="font-size: 1.5rem">${item.name}</h1>
            <h2 id="price" style="font-size: 1.5rem">Price $ ${item.price}</h2>
        </div>
        <button class="btn-addItem">Order Now</button>
    </div>`;
        })
        .join("");
    // console.log(html);
    document
        .querySelector(".flex-container")
        .insertAdjacentHTML("afterbegin", html);

    const addItems = document.querySelectorAll(".btn-addItem");
    const addToCart = (event) => {
        let btn_parent = event.target.parentElement;
        let itemName = btn_parent.childNodes[3].childNodes[1].innerText;
        let itemPrice = btn_parent.childNodes[3].childNodes[3].innerText;
        let item = {
            itemName,
            itemPrice,
        };
        productInCart.push(item);
        cart();
        console.log(productInCart);
    };

    for (let i = 0; i < addItems.length; i++) {
        addItems[i].addEventListener("click", addToCart);
    }
};
fetchData();

const cart = () => {
    if (productInCart.length > 0) {
        const html = productInCart
            .map((item) => {
                return `<div id="buy-items" class="">
                <div id="buy-item">
                    <h5>Product: ${item.itemName}</h5>
                    <h5>Price: ${item.itemPrice}</h5>
                </div>
               
            </div>`;
            })
            .join("");
        // console.log(html);
        document
            .querySelector(".cart")
            .insertAdjacentHTML("afterbegin", html);
        
    } else {
        let emptyText = document.querySelector(".modal-content");
        emptyText.appendChild(document.createTextNode(`This cart is empty`));
        console.log(emptyText);
    }
};

// Get the modal
const modal = document.getElementById("modal-cart");
// Get the button that opens the modal
const btn = document.getElementById("btn-cart");
const span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
    modal.style.display = "block";
};

span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
cart();
