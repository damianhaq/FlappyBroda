export class DGame {
  constructor() {
    /**
     * @type {CanvasRenderingContext2D}
     */
    this.ctx;
  }

  /**
   *
   * @param {string} canvasID string
   * @returns {CanvasRenderingContext2D}
   */
  init(canvasID) {
    this.ctx = document.querySelector(`#${canvasID}`).getContext("2d");

    return this.ctx;
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} r
   */
  arc(x, y, r) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, Math.PI * 2);
    this.ctx.stroke();
  }

  helloWorld() {
    console.log("Hello World");
  }
}

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {number} r
 * @param {CanvasRenderingContext2D} ctx
 */
export function drawCircle(x, y, r, ctx) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
}
/**
 *
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 */
export function drawRect(x, y, w, h, ctx) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.stroke();
}

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {string} text
 * @param {CanvasRenderingContext2D} ctx
 */
export function drawText(x, y, text, ctx) {
  ctx.fillText(text, x, y);
}

export function drawLine(x, y, tox, toy, ctx) {
  ctx.beginPath(); // Start a new path
  ctx.moveTo(x, y); // Move the pen to (30, 50)
  ctx.lineTo(tox, toy); // Draw a line to (150, 100)
  ctx.stroke(); // Render the path
}

export function isCircleRectangleCollision(
  circleX,
  circleY,
  circleRadius,
  rectX,
  rectY,
  rectWidth,
  rectHeight,
  ctx
) {
  // Find the closest point on the rectangle
  let closestX = Math.max(rectX, Math.min(circleX, rectX + rectWidth));
  let closestY = Math.max(rectY, Math.min(circleY, rectY + rectHeight));

  // drawLine(circleX, circleY, closestX, closestY, ctx);

  // Calculate the distance between the center of the circle and the closest point on the rectangle
  let distanceX = circleX - closestX;
  let distanceY = circleY - closestY;

  // Check if the distance is less than the circle's radius (collision occurs)
  return (
    distanceX * distanceX + distanceY * distanceY < circleRadius * circleRadius
  );
}

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
