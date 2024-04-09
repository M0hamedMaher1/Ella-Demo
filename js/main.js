let upper = document.querySelector(".upper");

window.addEventListener("scroll", function(){
    const nav = document.querySelector(".nav");
    let x = scrollY;
    if(x > 200){
        nav.style.transform = "translateY(0)";
        upper.style.transform = "translateY(0)";
    }else{
        nav.style.transform = "translateY(calc(-100% + -6px))";
        upper.style.transform = "translateY(calc(100% + 40px))";
    };
});

upper.addEventListener("click", function(){
    window.scrollTo(0,0);
});

let row = document.querySelector(".products-row1");
let leftSide = document.querySelector(".leftSide2");

let list = [];
let list2 = [];

let spanCount = document.querySelectorAll("#basket span");

let cart;
if(localStorage.getItem("new") == null){
    cart = [];
}else{
    cart = JSON.parse(localStorage.getItem("new"));
    spanCount.forEach((item) => {
        item.innerHTML = cart.length;
    });
}

const getData = async function(){
    let api = await fetch("data.json");
    let response = await api.json();
    let products = response.products;
    list = products;
    let list3 = response.product;
    list2 = list3;
    displayProducts(products);
    displayProducts2(list3)
};
getData();

let index1;

function displayProducts(take){
    let card = "";
    take.forEach((item, index) => {
        card += `
        <div class="card">
        <div class="image">
            <span class="sale">sale</span>
            <img src="${item.image1}" alt="">
            <img src="${item.image2}" alt="" class="img2">
            <button onclick="openInfo(${index})">quick view</button>
        </div>
        <div class="card-body">
            <h3>${item.title}</h3>
            <div class="disc">
                <h5><span>${item.disc}</span> from</h5>
                <span class="price">${item.price}</span>
            </div>
            <div class="four-colors">
                <div class="black"></div>
                <div class="creamie"></div>
                <div class="gray"></div>
                <div class="orange"></div>
            </div>
            <div class="choose">
                <button>choose options</button>
                <i class="fa-regular fa-heart"></i>
            </div>
        </div>
    </div>
        `
    });
    row.innerHTML = card;
};

function displayProducts2(take){
    let card = "";
    take.forEach((item, index2) => {
        card += `
        <div class="card">
        <div class="image">
            <img src="${item.image1}" alt="">
            <img src="${item.image2}" alt="" class="img2">
            <button onclick="openInfo2(${index2})">quick view</button>
        </div>
        <div class="card-body">
            <h3>${item.title}</h3>
            <div class="disc">
                <h5>from ${item.price}</h5>
            </div>
            <div class="four-colors">
                <div class="black"></div>
                <div class="creamie"></div>
                <div class="gray"></div>
                <div class="orange"></div>
            </div>
            <div class="choose choose2">
                <button>choose options</button>
                <i class="fa-regular fa-heart"></i>
            </div>
        </div>
    </div>
        `
    });
    leftSide.innerHTML = card;
};


let leftImage = document.querySelector(".left-image img");
let overlay = document.querySelector(".overlay");
let title = document.querySelector(".right-info h3");
let price2 = document.querySelector(".price2");
let close1 = document.querySelector(".close");
let rightInfo = document.querySelector(".overlay-info");

function openInfo(index){
    index1 = index;
    overlay.style.display = "flex";
    setTimeout(() => {
        rightInfo.style.transform = "translateY(0)";
        rightInfo.style.opacity = "1";
    }, 100)
    let name = list[index].title;
    let price = list[index].price;
    let img = list[index].image1;
    title.textContent = name;
    price2.textContent = price;
    leftImage.src = img;
};

function openInfo2(index2){
    overlay.style.display = "flex";
    setTimeout(() => {
        rightInfo.style.transform = "translateY(0)";
        rightInfo.style.opacity = "1";
    }, 100)
    let name = list2[index2].title;
    let price = list2[index2].price;
    let img = list2[index2].image1;
    title.textContent = name;
    price2.textContent = price;
    leftImage.src = img;
};

close1.addEventListener("click", function(){
    rightInfo.style.transform = "translateY(-60px)";
    rightInfo.style.opacity = "0";
    setTimeout(() => {
        overlay.style.display = "none";
    }, 200)
});

let plus = document.querySelector(".plus");
let minus = document.querySelector(".minus");
let counts = document.querySelector(".buttons h5");

plus.addEventListener("click", function(){
    counts.innerHTML++;
});

minus.addEventListener("click", function(){
    counts.innerHTML--;
    if(counts.innerHTML < 0){
        counts.innerHTML = 0;
    };
});


let addToCart = document.querySelector(".addToCart");

addToCart.addEventListener("click", function(){
    let choosenProduct = list[index1];
    let final = cart.find((item) => item.id == choosenProduct.id);
    if(final && counts.innerHTML > 1){
        final.count = counts.innerHTML;
    }else{
        cart.push({...choosenProduct,count: 1});
    };
    spanCount.forEach((item) => {
        item.innerHTML = cart.length;
    });
    localStorage.setItem("new", JSON.stringify(cart));
});

let aside = document.querySelector(".aside1");
let bars = document.querySelector(".bars");
let closeAside = document.querySelector(".closeAside");

bars.addEventListener("click", function(){
    aside.style.transform = "translateX(0)";
});

closeAside.addEventListener("click", function(){
    aside.style.transform = "translateX(calc(-100% + -40px))";
});