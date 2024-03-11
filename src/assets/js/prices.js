const toggle = document.querySelector("#pricing-603 .cs-toggle");
const cardGroup = Array.from(document.querySelectorAll(".cs-card-group"));

toggle.addEventListener("click", (e) => {
  for (const item of cardGroup) {
    item.classList.toggle("active");
  }
  toggle.classList.toggle("active");
});
