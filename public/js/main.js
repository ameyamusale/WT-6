document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".book-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("card-hover");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("card-hover");
    });
  });

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
});