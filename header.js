  //hamburger


  const hamburger = document.querySelector(".hamburger");
  const stickyHamburger = document.querySelector("#siteHeader-sticky .hamburger")
const navList = document.querySelector(".nav-list");
const stickyNavList = document.querySelector("#siteHeader-sticky .nav-list");
const contact = document.querySelector(".contact");

hamburger.addEventListener("click", () => {

    navList.classList.toggle("active");
    contact.classList.toggle("active");

    hamburger.querySelector("i").classList.toggle("fa-bars");
    hamburger.querySelector("i").classList.toggle("fa-xmark");

});

stickyHamburger .addEventListener("click", () => {

    stickyNavList.classList.toggle("active");
    contact.classList.toggle("active");

    stickyHamburger .querySelector("i").classList.toggle("fa-bars");
    stickyHamburger .querySelector("i").classList.toggle("fa-xmark");

});




  (function () {
  const header = document.getElementById('siteHeader');
  const stickyHeader = document.getElementById('siteHeader-sticky');
  if (!header || !stickyHeader) return;

  const THRESHOLD = 90; // px scrolled before the swap happens
  let ticking = false;

  function updateHeaders() {
    const y = window.scrollY || window.pageYOffset;
    if (y > THRESHOLD) {
      header.classList.add('header-hidden');
      stickyHeader.classList.add('header-visible');
    } else {
      header.classList.remove('header-hidden');
      stickyHeader.classList.remove('header-visible');
    }
    ticking = false;


    const STICK_THRESHOLD = 300; // px scrolled before it locks flush to top

if (y > STICK_THRESHOLD) {
  stickyHeader.classList.add('header-stuck');
} else {
  stickyHeader.classList.remove('header-stuck');
}

  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateHeaders);
      ticking = true;
    }
  }, { passive: true });




  updateHeaders(); // set correct state on load (e.g. after a refresh mid-scroll)
})();
