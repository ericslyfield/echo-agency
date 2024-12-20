const circle = document.querySelector("#circle");
const text = circle.dataset.text;
const characters = text.split("");

const deltaAngle = 360 / characters.length;
const distanceFromCenter = 256;

characters.forEach((character, index) => {
  const span = document.createElement("span");
  span.innerText = character;

  const rotateY = `rotateY(${index * deltaAngle}deg)`;
  const translateZ = `translateZ(${distanceFromCenter}px)`;
  span.style.transform = `${rotateY} ${translateZ}`;

  circle.appendChild(span);
});
