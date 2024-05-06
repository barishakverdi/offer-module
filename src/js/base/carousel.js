import Swiper from 'swiper';
import {Navigation, Autoplay, Pagination, Parallax, Grid, Controller, Thumbs, EffectCards, EffectCube, EffectFade, EffectCoverflow, EffectFlip, EffectCreative, FreeMode} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination, Autoplay],

    navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
    },
    speed: 700,
    slidesPerView: 1,
    loop: false,
    autoplay: {
      delay: 5000,
    },

    breakpoints: {
        992: {
            slidesPerView: 2
        }
    }
});
