gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const tabletBreakpoint = 768;

const header = document.querySelector('.header');
const hero = document.querySelector('.hero');

function setHeroPadding() {
    const headerHeight = header.offsetHeight;
    hero.style = `padding-block-start: ${headerHeight + 30}px`;
}


const burgerEl = document.querySelector('.burger');
const navEl = document.querySelector('.header__nav');

function animateBurger() {
    const topLine = burgerEl.querySelector('.burger__line--top');
    const midLine = burgerEl.querySelector('.burger__line--mid');
    const botLine = burgerEl.querySelector('.burger__line--bot');

    const tl = gsap.timeline({paused: true, reversed: true, duration: .1, ease: Back.easeOut});
    tl.to(burgerEl, {rotateY: 180, })
      .to(midLine, {autoAlpha: 0}, '<')
      .to(topLine, {y: '+= 6px'}, '<')
      .to(botLine, {y: '-= 6px'}, '<')
      .to(topLine, {rotate: 45})
      .to(botLine, {rotate: -45}, '<')

    return tl;
}

function hoverBurger() {
    gsap.fromTo(burgerEl, {scale: .5}, {scale: 1, ease: Elastic.easeOut})
}


function animateNav() {
    tl = gsap.timeline({paused: true, reversed: true});
    gsap.set(navEl, {scale: 0, autoAlpha: 0});
    tl.to(navEl, {scale: 1, autoAlpha: 1})
    .from('.header__link', {opacity: 0, y: 15, stagger: 0.1, duration: .2})
    return tl;
}


function addMediaQueryWatcher(query, layoutChangeCallback) {
    const mql = window.matchMedia(query, layoutChangeCallback);
    mql.addEventListener('change', e => layoutChangeCallback(e.matches));
    layoutChangeCallback(mql.matches);
}


const mm = gsap.matchMedia();
let menuOpen = false;

mm.add("(max-width: 767px)", () => {
    const burgerTl = animateBurger();
    const navTl = animateNav();

    const menuHandler = () => {
        burgerTl.resume().reversed(!burgerTl.reversed());
        navTl.resume().reversed(!navTl.reversed());
    }

    burgerEl.addEventListener('click', menuHandler);

    return () => {
        menuOpen = false;
        burgerEl.removeEventListener('click', menuHandler);
        navTl.reverse();
    }

})

if (ScrollTrigger.isTouch !== 1) {
    const scroller = ScrollSmoother.create({
        wrapper: '.scroll-wrapper',
        content: '.scroll-content',
        smooth: 1,
        effects: true,
        normalizeScroll: true,
    })
}





// Reveal animations

function revealBlockBottom(targets) {
    console.log(targets);
    targets.forEach(target => {
        gsap.to(target, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            scrollTrigger: {
                trigger: target,
                start: 'top 40%',
            }
        })
    }) 
}

function revealFromLeft(targets) {
    targets.forEach(target => {
        gsap.from(target, {
            xPercent: '-=15',
            opacity: 0,
            scrollTrigger: {
                trigger: target,
                start: 'top 50%',
            }
        })
    })
}

function revealFromSide(targets, side='left') {
    const xVal = side == 'left' ? '-=15' : '+=15';

    targets.forEach(target => {
        gsap.from(target, {
            xPercent: xVal,
            opacity: 0,
            scrollTrigger: {
                trigger: target,
                start: 'top 50%',
            }
        })
    })
}

function revealFromBot(targets) {
    targets.forEach(target => {
        gsap.from(target, {
            yPercent: '+= 15',
            opacity: 0,
            scrollTrigger: {
                trigger: target,
                start: 'top 60%',
            }
        })
    })
}

function revealScale(targets) {
    targets.forEach(target => {
        gsap.from(target, {
            scale: .6,
            opacity: 0,
            ease: Elastic.easeOut,
            duration: 1,
            scrollTrigger: {
                trigger: target,
                start: 'top 60%',
            }
        })
    })
}

// function revealFrom(targets) {
//     console.log(targets);
//     targets.forEach(target => {
//         gsap.set(target, {scaleY: 0, transformOrigin: 'bottom left'});
//         gsap.to(target, {
//             scaleY: 1,
//             scrollTrigger: {
//                 trigger: target,
//                 start: 'top 60%'
//             }
//         })
//     })
// }

function animateRacoon() {
    gsap.to('.pros__racoon', {
        scale: .8,
        duration: 3,
        scrollTrigger: {
            trigger: '.pros__racoon',
            scrub: 2,
            start: 'top 60%'
        }
    })
}

function animateGrow(targets) {
    targets.forEach(target => {
        gsap.set(target, {scale: .7, filter: 'grayScale(1)'});
        gsap.to(target, {
            scale: 1,
            filter: 'grayScale(0)',
            scrollTrigger: {
                trigger: target,
                start: 'top 50%',
                scrub: 2,
            }
        })
    })
} 

const blocksFromBottom = document.querySelectorAll('.reveal-block-bt');
const revealFromLeftEls = document.querySelectorAll('.reveal-from-left');
const revealFromRightEls = document.querySelectorAll('.reveal-from-right');
const revealFromBotEls = document.querySelectorAll('.reveal-from-bot')
const revealScaleEls = document.querySelectorAll('.reveal-scale');
const revealTextEls = document.querySelectorAll('.text-reveal');
const animateGrowEls = document.querySelectorAll('.animate-grow');

revealBlockBottom(blocksFromBottom);
revealFromLeft(revealFromLeftEls);
revealFromSide(revealFromRightEls, 'right');
revealFromBot(revealFromBotEls);
revealScale(revealScaleEls);
animateRacoon();
animateGrow(animateGrowEls);


// Swiper

const prosSwiper = new Swiper('.pros__slider', {
    slidesPerView: 1,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    breakpoints: {
        768: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
})

const charitiesSwiper = new Swiper('.charities__slider', {
    slidesPerView: 1,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    breakpoints: {
        768: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
})

let testimonialsSwiper;


// let testimonialsSwiper = new Swiper('.testimonials__slider', {
//     slidesPerView: 1,
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//       },
//     breakpoints: {
//         768: {
//             slidesPerView: 3,
//             spaceBetween: 30
//         }
//     }
// })

const createSlider = selector => {
    const slider = new Swiper(selector, {
        slidesPerView: 1,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    })

    return slider;
}



const mediaQuery = window.matchMedia(`(min-width: ${tabletBreakpoint}px)`);

mediaQuery.addEventListener('change', () => {
    resizeWindowHandler();
})

function resizeWindowHandler() {
    setHeroPadding();
    const screenWidth = window.innerWidth;
    console.log(screenWidth)
    
    if (screenWidth >= tabletBreakpoint) {
        console.log("YES")
        if (testimonialsSwiper !== undefined) {
            console.log('destroy');
            testimonialsSwiper.destroy(true, true)
        };
    } else {
        testimonialsSwiper = createSlider('.testimonials__slider')
    }
}


// window.onresize = resizeWindowHandler;

document.addEventListener('DOMContentLoaded', () => {
    resizeWindowHandler();
})
