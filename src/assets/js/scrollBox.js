const scrollBox = document.querySelector(".scrollBox");

let isScrolling = false;
let startX, scrollLeft;

scrollBox.addEventListener("mousedown", (e) => {
  isScrolling = true;
  scrollBox.style.cursor = "grabbing";
  startX = e.pageX - scrollBox.offsetLeft;
  scrollLeft = scrollBox.scrollLeft;
});

scrollBox.addEventListener("mouseup", () => {
  isScrolling = false;
  scrollBox.style.cursor = "grab";
});

scrollBox.addEventListener("mousemove", (e) => {
  if (!isScrolling) return;
  e.preventDefault();
  const x = e.pageX - scrollBox.offsetLeft;
  const walk = (x - startX) * 3; // Adjusts the scroll speed
  scrollBox.scrollLeft = scrollLeft - walk;
});

scrollBox.addEventListener("touchstart", (e) => {
  isScrolling = true;
  startX = e.touches[0].pageX - scrollBox.offsetLeft;
  scrollLeft = scrollBox.scrollLeft;
});

scrollBox.addEventListener("touchend", () => {
  isScrolling = false;
});

scrollBox.addEventListener("touchmove", (e) => {
  if (!isScrolling) return;
  e.preventDefault();
  const x = e.touches[0].pageX - scrollBox.offsetLeft;
  const walk = (x - startX) * 3; // Adjusts the scroll speed
  scrollBox.scrollLeft = scrollLeft - walk;
});