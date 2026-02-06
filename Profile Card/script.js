let roles = [
  "Frontend Developer",
  "Programmer",
  "Student",
  "Software Developer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let speed = 120;

let display_role = document.querySelector(".roles");

function typeEffect() {
  let currentRole = roles[roleIndex];

  if (!isDeleting) {
    display_role.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
  } else {
    display_role.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;
  }

  if (charIndex === currentRole.length) {
    isDeleting = true;
    speed = 1000; // pause after typing
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 150;
  } else {
    speed = isDeleting ? 80 : 120;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();
