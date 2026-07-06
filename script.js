
//   document.getElementById('year').textContent = new Date().getFullYear();

  (function runIntro(){
    const preloader = document.getElementById('preloader');
    const titleEl = document.getElementById('preloadTitle');
    const subEl = document.getElementById('preloadSub');
    const logoEl = document.getElementById('preloadLogo');
    const fillEl = document.getElementById('loadingFill');
    const counterEl = document.getElementById('preloadCounter');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const finish = () => {
      preloader.remove();
      document.documentElement.classList.remove('preload-lock');
    };

    if (reduce) { finish(); return; }

    // 1) Letters of ABHINNOVATION appear one by one
    const brandWord = 'ABHINNOVATION';
    const letterStagger = 70;
    const letterDuration = 500;
    const lettersStart = 200;
    brandWord.split('').forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = ch;
      span.style.animationDuration = letterDuration + 'ms';
      span.style.animationDelay = (lettersStart + i * letterStagger) + 'ms';
      titleEl.appendChild(span);
    });
    const lettersEnd = lettersStart + (brandWord.length - 1) * letterStagger + letterDuration;

    // Pause after the wordmark finishes before the subline begins
    const pauseAfterLetters = 400;

    // 2) "Group of Companies" — each word glides in from the right
    const subWords = ['Group', 'of', 'Companies'];
    const wordStagger = 180;
    const wordDuration = 500;
    const subStart = lettersEnd + pauseAfterLetters;
    subWords.forEach((w, i) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = w;
      span.style.animationDuration = wordDuration + 'ms';
      span.style.animationDelay = (subStart + i * wordStagger) + 'ms';
      subEl.appendChild(span);
    });
    const subEnd = subStart + (subWords.length - 1) * wordStagger + wordDuration;

    // Pause after the subline finishes before the logo emerges
    const pauseAfterSub = 300;

    // 3) Logo emerges from behind the wordmark, tilting slightly at the end
    const logoStart = subEnd + pauseAfterSub;
    const logoDuration = 700;
    logoEl.style.animationDuration = logoDuration + 'ms';
    logoEl.style.animationDelay = logoStart + 'ms';
    logoEl.classList.add('emerge');
    const logoEnd = logoStart + logoDuration;

    // Pause after the logo settles before lifting away
    const holdTime = 300;
    const liftoffStart = logoEnd + holdTime; // ~4100ms
    const liftoffDuration = 900;             // total sequence lands at ~5000ms

    // requestAnimationFrame(() => preloader.classList.add('show'));

    setTimeout(() => preloader.classList.add('liftoff'), liftoffStart);
    setTimeout(finish, liftoffStart + liftoffDuration);
  })();


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



// document.querySelectorAll(".nav-list a").forEach(link=>{

//     link.addEventListener("click",()=>{

//         navList.classList.remove("active");
//         contact.classList.remove("active");

//         hamburger.querySelector("i").classList.add("fa-bars");
//         hamburger.querySelector("i").classList.remove("fa-xmark");

//     });

// });







  /* ---------- HERO ROTATING WORD + BACKGROUND CROSSFADE ---------- */
  (function heroRotator(){
    const wordEl = document.getElementById('heroWord');
    const bgA = document.getElementById('heroBgA');
    const bgB = document.getElementById('heroBgB');
    if (!wordEl || !bgA || !bgB) return;

    // Word shown first (Infrastructure) matches the initial hero image already
    // set inline on #heroBgA, so it is NOT repeated in this rotation list —
    // it plays again once the loop comes back around.
    const heroWords = [
      { text: 'Infrastructure',        img: 'assets/hero/infrastructure.avif' },
      { text: 'Operations',            img: 'assets/hero/operations.jpg' },
      { text: 'Security',              img: 'assets/hero/security.avif' },
      { text: 'Software Development',  img: 'assets/hero/software.avif' },
      { text: 'Media & Entertainment', img: 'assets/hero/media.jpg' }
    ];

    // const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Preload all category images so the crossfade never shows a blank frame
    heroWords.forEach(w => { const i = new Image(); i.src = './' + w.img; });

    let index = 0;          // currently displayed word index
    let showingA = true;    // which bg layer is currently visible
    const holdTime = 3200;  // ms each word stays before swapping
    const textFadeMs = 450;

    // if (reduce) {
    //   // Simple non-animated cycling for reduced-motion users
    //   setInterval(() => {
    //     index = (index + 1) % heroWords.length;
    //     const next = heroWords[index];
    //     wordEl.textContent = next.text;
    //     bgA.style.backgroundImage = `url('./${next.img}')`;
    //     bgA.style.opacity = '1';
    //     bgB.style.opacity = '0';
    //   }, holdTime);
    //   return;
    // }

    const cycle = () => {
      index = (index + 1) % heroWords.length;
      const next = heroWords[index];

      // Fade the word out, swap it, fade back in
      wordEl.classList.add('fade-out');
      setTimeout(() => {
        wordEl.textContent = next.text;
        wordEl.classList.remove('fade-out');
      }, textFadeMs);

      // Crossfade the background layers
      const incoming = showingA ? bgB : bgA;
      const outgoing = showingA ? bgA : bgB;
      incoming.style.backgroundImage = `url('./${next.img}')`;
      requestAnimationFrame(() => {
        incoming.style.opacity = '1';
        outgoing.style.opacity = '0';
      });
      showingA = !showingA;
    };

    setInterval(cycle, holdTime);
  })();












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


// stat-counter 

const figures = document.querySelectorAll(".figure");

const animate = (el) => {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || "";
  const duration = 2000;
  const start = performance.now();

  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const value = Math.round(progress * target);

    el.textContent = value + suffix;

    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    animate(entry.target);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.5 });

figures.forEach(figure => observer.observe(figure));










// business - panel


// icon-movement
document.querySelectorAll(".panel").forEach(panel => {

    const img = panel.querySelector(".panel-bg img");

    panel.addEventListener("mousemove", e => {

        const rect = panel.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const moveX = (x - rect.width/2) / 20;
        const moveY = (y - rect.height/2) / 20;

        img.style.transform =
            `translate(${moveX}px, ${moveY}px)
             scale(1.08)
             rotate(${moveX/10}deg)`;
    });

    panel.addEventListener("mouseleave", () => {
        img.style.transform =
            "translate(0,0) scale(1) rotate(0deg)";
    });

});


// panel-expand

  const panels = document.querySelectorAll('.panel');
  panels.forEach(p => {
    p.addEventListener('click', (e) => {
      const link = e.target.closest('.panel-link');
      if (link && p.classList.contains('active')) {
        const href = p.getAttribute('data-href');
        if (href && href !== '#') window.open(href, '_blank');
        return;
      }
      panels.forEach(o => o.classList.remove('active'));
      p.classList.add('active');
    });
  });










  // value-circles

const section = document.getElementById("values-section");

if (window.innerWidth > 1150) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        section.classList.add("in-view");
        observer.disconnect(); // run only once
      }
    },
    {
      threshold: 0.5 // fires when 50% of section is visible
    }
  );

  observer.observe(section);
}











// marquuuu



  // Duplicate the track once so the loop can seamlessly wrap: the
  // animation slides the whole (now doubled) track left by exactly
  // 50% of its width, which lines up perfectly with the start of the
  // second copy, creating an endless scroll with no visible seam.
  const track = document.getElementById('marquee-track');
  track.innerHTML += track.innerHTML;
