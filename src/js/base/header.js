const html = document.getElementsByTagName("html")[0];
export const body = document.getElementsByTagName("body")[0];
const header = document.getElementById("header");
const headerOffset = document.createElement("div");
const whiteLogo = document.getElementById("logo-white");
const coloredLogo = document.getElementById("logo-colored");
const menuItem = document.querySelectorAll(".menu-item");

header.insertAdjacentElement("afterend", headerOffset);

//Preparing dropdown hover mover animation
const afterHeaderBody = document.createElement("div");
header.firstElementChild.appendChild(afterHeaderBody);
afterHeaderBody.classList.add("mover");
afterHeaderBody.style.height = header.offsetHeight + "px";

/*Menu Item Hover Animation */
menuItem.forEach(item => {
    item.addEventListener("mouseover", function () {
        //if (item.childElementCount < 2) return;

        if (item.querySelector(".sub-menu") && window.innerWidth > 1024) {
            body.classList.add("after:h-full", "dropdown-active", "overflow-y-hidden");

            if (window.scrollY === header.offsetTop) {
                coloredLogo.style.width = whiteLogo.offsetWidth + "px";
                whiteLogo.style.display = "none";
                coloredLogo.style.display = "block";
            }

            afterHeaderBody.style.height = header.offsetHeight + parseInt(item.querySelector(".sub-menu").offsetHeight) + "px";
            afterHeaderBody.classList.add("bg-white");
        }
    })

    item.addEventListener("mouseout", function () {
        body.classList.remove("after:h-full", "dropdown-active", "overflow-y-hidden");

        if (window.scrollY === header.offsetTop) {
            whiteLogo.style.display = "block";
            coloredLogo.style.display = "none";
            coloredLogo.style.width = coloredLogo.getAttribute("data-sticky-width") + "px";
        }

        afterHeaderBody.style.height = header.offsetHeight + "px";
        afterHeaderBody.classList.remove("bg-white");
        //afterHeaderBody.style.backgroundColor = "transparent";
    })
})
/*Menu Item Hover Animation */


/* Sticky Header */
window.onscroll = function (){
    headerOffset.style.height = header.offsetHeight + "px";

    if (window.scrollY > header.offsetTop) {
        html.classList.add("sticky-active");

        coloredLogo.style.display = "block";
        coloredLogo.style.width = coloredLogo.getAttribute('data-sticky-width') + "px";
        whiteLogo.style.display = "none";

        //mover block height change
        afterHeaderBody.style.height = header.offsetHeight + "px";
    }

    else {
        headerOffset.style.height = "0";
        html.classList.remove("sticky-active");

        coloredLogo.style.display = "none";
        whiteLogo.style.display = "block";

        //mover block height change
        afterHeaderBody.style.height = "0";
    }
}
/* Sticky Header */


/* Sidenav */
const sideNav = document.getElementById("sideNav");
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-button");
menuBtn.addEventListener("click", () => {
    sideNav.classList.toggle("open");
    body.classList.toggle("overflow-y-hidden");
    menuBtn.classList.toggle("!items-start");
})

closeBtn.addEventListener("click", () => {
    sideNav.classList.remove("open");
    body.classList.remove("overflow-y-hidden");
    menuBtn.classList.remove("!items-start");
})

window.onload = () => {
    menuItem.forEach(mobileItem => {
        mobileItem.addEventListener("click", () => {

            if (mobileItem.querySelector(".sub-menu") && window.innerWidth < 1024) {
                mobileItem.querySelector(".sub-menu").classList.toggle("sub-menu-open");
            }
        })
    })
}
/* Sidenav */

