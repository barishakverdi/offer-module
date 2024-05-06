if (window.location.pathname === "/") window.location.assign("views/"); if (window.location.pathname !== "/views/") document.body.classList.add("not-index"); if (window.location.href.indexOf("localhost") > -1 || window.location.href.indexOf("vite-starter") > -1) document.querySelector('[rel="canonical"]').setAttribute("href", window.location.href);
import('./js/base/header.js');
import('./js/base/carousel.js');
import('./js/base/fancybox.js');
import('./js/base/form.js');
import('./js/base/modal.js');
import('./js/base/dropdown.js');
import('./js/project/custom.js');
