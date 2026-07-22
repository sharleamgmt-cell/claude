// Kayla Lawrence Photography — shared site behavior

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initHeroSlideshow();
});

function initNav() {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (nav && nav.classList.contains('is-transparent')) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        nav.classList.add('is-solid');
      } else {
        nav.classList.remove('is-solid');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      document.body.classList.toggle('menu-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dots button');
  if (slides.length < 2) return;

  let current = 0;
  const interval = 5500;

  const goTo = (index) => {
    slides[current].classList.remove('is-active');
    dots[current] && dots[current].classList.remove('is-active');
    current = index;
    slides[current].classList.add('is-active');
    dots[current] && dots[current].classList.add('is-active');
  };

  let timer = setInterval(() => {
    goTo((current + 1) % slides.length);
  }, interval);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      goTo(i);
      timer = setInterval(() => {
        goTo((current + 1) % slides.length);
      }, interval);
    });
  });
}
