gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

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
    // gsap.set(navEl, {scale: 0, autoAlpha: 0});
    tl.fromTo(navEl, {scale: 0, autoAlpha: 0}, {scale: 1, autoAlpha: 1})
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

mm.add("(max-width: 766px)", () => {
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

const scroller = ScrollSmoother.create({
    wrapper: '.scroll-wrapper',
    content: '.scroll-content',
    smooth: 2,
    effects: true,
    normalizeScroll: true,
})




document.addEventListener('DOMContentLoaded', () => {
    setHeroPadding();
})

window.onresize = setHeroPadding;