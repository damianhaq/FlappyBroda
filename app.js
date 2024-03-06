// import { DGame } from "./DamianosGameEngine/game.js";
import {
  drawCircle,
  drawLine,
  drawRect,
  drawText,
  isCircleRectangleCollision,
  randomNumber,
} from "./DamianosGameEngine/game.js";

// const dg = new DGame();
// dg.init("canvas");

// dg.arc(20, 20, 5);

// function loop() {
//   requestAnimationFrame(loop);
// }

const image = new Image();
image.src = "dfb.jpg";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

canvas.addEventListener("click", (ev) => {
  // if (speed > 0) speed = 0;
  speed = -maxSpeed;
});

let x = canvas.width / 3;
let y = 30;
const r = 12;

const maxSpeed = 2;
const acc = 0.05;
let speed = 0;

const startXPointWalls = canvas.width + 10;
const wallWidth = 30;
let holeSize = 150;

const holes = [];
let countWalls = 2;

// for (let i = 0; i < 5; i++) {
//   const nextWallDistance = randomNumber(200, 300);
//   holes.push({ x: startXPointWalls + i * nextWallDistance, y: 100 + i * 30 });
// }
holes.push({ x: startXPointWalls, y: 100 + 30, count: 1 });

console.log(holes);

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw start point line
  drawLine(startXPointWalls, -10, startXPointWalls, canvas.height + 10, ctx);

  // add walls
  if (holes[holes.length - 1].x - startXPointWalls < 0) {
    const nextWallDistance = randomNumber(150, 400);
    const holeY = randomNumber(
      canvas.height / 10,
      canvas.height - canvas.height / 10
    );
    holes.push({
      x: startXPointWalls + nextWallDistance,
      y: holeY,
      count: countWalls,
    });
    console.log(holeSize);
    countWalls++;
    holeSize--;
  }

  // remove walls
  if (holes[0].x < -100) {
    holes.shift();
  }

  ctx.drawImage(image, speed > 0 ? 32 : 0, 0, 34, 32, x - 16, y - 16, 32, 32);
  // drawCircle(x, y, r, ctx);

  holes.forEach((el, index) => {
    drawRect(el.x, -10, wallWidth, el.y + 10, ctx);
    drawText(el.x, el.y + 20, el.count, ctx);
    drawRect(el.x, el.y + holeSize, wallWidth, canvas.height - el.y + 10, ctx);
  });

  // apply acc to speed
  if (speed < maxSpeed) speed = +(speed + acc).toFixed(2);

  // end game
  if (y + r > canvas.height || y - r < 0) {
    return;
  }

  // collision
  let collide = false;
  holes.forEach((el) => {
    const topWall = isCircleRectangleCollision(
      x,
      y,
      r,
      el.x,
      -10,
      wallWidth,
      el.y + 10,
      ctx
    );
    const botWall = isCircleRectangleCollision(
      x,
      y,
      r,
      el.x,
      el.y + holeSize,
      wallWidth,
      canvas.height - el.y + 10,
      ctx
    );

    if (topWall || botWall) collide = true;
  });

  if (collide) return;

  // moving y-axis
  y = y + speed;

  // moving walls
  holes.forEach((el, index) => {
    holes[index].x = el.x - 1;
  });

  // drawText(x + 15, y, speed, ctx);

  requestAnimationFrame(loop);
}

loop();
