const swipe = document.getElementById("swipe");
const originalSlides = Array.from(swipe.children);
const total = originalSlides.length;
const indicator = document.getElementById("indicator");

let currentIndex = 1; // because we will prepend a clone
let isTransitioning = false;

// Clone first and last slides for infinite loop
const firstClone = originalSlides[0].cloneNode(true);
const lastClone = originalSlides[total - 1].cloneNode(true);

swipe.insertBefore(lastClone, swipe.firstChild);
swipe.appendChild(firstClone);

const slides = swipe.children;

// Initialize position
swipe.style.transform = `translateX(-${currentIndex * 100}%)`;

// Create indicators
for (let i = 0; i < total; i++) {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i + 1)); // adjust for clone
  indicator.appendChild(dot);
}

function updateIndicator(index) {
  const dots = indicator.children;
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.toggle("active", i === index - 1); // adjust for clone
  }
}

function goToSlide(index) {
  if (isTransitioning) return;
  isTransitioning = true;
  swipe.style.transition = "transform 0.5s ease-in-out";
  swipe.style.transform = `translateX(-${index * 100}%)`;
  currentIndex = index;
  updateIndicator(index);
}

// Handle the loop transition
swipe.addEventListener("transitionend", () => {
  isTransitioning = false;
  if (currentIndex === 0) {
    swipe.style.transition = "none";
    currentIndex = total;
    swipe.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
  if (currentIndex === total + 1) {
    swipe.style.transition = "none";
    currentIndex = 1;
    swipe.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
});

setInterval(() => {
  goToSlide(currentIndex + 1);
}, 4000);