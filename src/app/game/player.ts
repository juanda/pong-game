import { IUpdateable } from "./IUpdateable";
import { WindowRefService } from '../services/window-ref.service';

export class Player implements IUpdateable {

  up: boolean = false
  down: boolean = false

  radius: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
  constructor(
    private name: string,
    private ctx: CanvasRenderingContext2D) { }

  setUp(v: boolean) {
    this.up = v
  }
  setDown(v: boolean){
    this.down = v
  }
  random(min, max) {
    return min + Math.random() * (max - min);
  }

  randomChoice(...args: number[]) {
    return args[Math.floor(this.random(0, args.length))];
  }

  init() {
    this.radius = this.random(1, 30);
    this.minX = this.radius;
    this.minY = this.radius;
    this.maxX = this.ctx.canvas.width - this.radius;
    this.maxY =
      this.ctx.canvas.height - this.radius;
    this.x = this.random(this.minX, this.maxX);
    this.y = this.random(this.minY, this.maxY);
    this.dx =
      (this.maxX - this.minX) / (this.random(1, 10) * this.randomChoice(1, -1));
    this.dy =
      (this.maxY - this.minY) / (this.random(1, 10) * this.randomChoice(1, -1));
    this.color =
      "rgb(" +
      Math.round(this.random(0, 255)) +
      ", " +
      Math.round(this.random(0, 255)) +
      ", " +
      Math.round(this.random(0, 255)) +
      ")";
  }
  update(step: number) {
    if (this.up) return
    let dt = step;
    this.x = this.x + this.dx * dt;
    this.y = this.y + this.dy * dt;

    if (this.dx > 0 && this.x > this.maxX) {
      this.x = this.maxX;
      this.dx = -this.dx;
    } else if (this.dx < 0 && this.x < this.minX) {
      this.x = this.minX;
      this.dx = -this.dx;
    }

    if (this.dy > 0 && this.y > this.maxY) {
      this.y = this.maxY;
      this.dy = -this.dy;
    } else if (this.dy < 0 && this.y < this.minY) {
      this.y = this.minY;
      this.dy = -this.dy;
    }

  }

  render(dt: number) {
    let w = this.radius * 2;
    let h = w;
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
