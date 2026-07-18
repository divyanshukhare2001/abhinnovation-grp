document.querySelectorAll('a[href*="index.html"]').forEach(link => {
  link.addEventListener("click", () => {
    sessionStorage.setItem("skipPreloader", "true");
  });
});