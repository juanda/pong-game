import { IUpdateable } from "./IUpdateable";
import { ConfigService } from "../services/config.service";

export class Paddle implements IUpdateable {
  x: number;
  y: number;
  left: number;
  right: number;
  top: number;
  botton: number;
  up: number;
  down: number;
  width: number;
  height: number;
  minY: number;
  maxY: number;
  speed: number;

  constructor(private ctx: CanvasRenderingContext2D) {
    this.up = 0
    this.down = 0
  }

  setPos(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.left = this.x;
    this.right = this.left + this.width;
    this.top = this.y;
    this.botton = this.y + this.height;
  }

  setDir(dy: number) {
    this.up = dy < 0 ? -dy : 0;
    this.down = dy > 0 ? dy : 0;
  }

  moveUp() {
    this.up = 1;
  }
  moveDown() {
    this.down = 1;
  }
  stopMovingUp() {
    this.up = 0;
  }
  stopMovingDown() {
    this.down = 0;
  }

  init() {
    this.width = ConfigService.config.pong.paddleWidth;
    this.height = ConfigService.config.pong.paddleHeight;
    this.minY = ConfigService.config.pong.wallWidth;
    this.maxY =
      ConfigService.config.pong.height -
      ConfigService.config.pong.wallWidth -
      this.height;
    this.speed =
      (this.maxY - this.minY) / ConfigService.config.pong.paddleSpeed;
  }

  update(step: number) {
    let amount = this.down - this.up;
    if (amount != 0) {
      var y = this.y + amount * step * this.speed;
      if (y < this.minY) y = this.minY;
      else if (y > this.maxY) y = this.maxY;
      this.setPos(this.x, y);
    }
  }

  render(dt: number) {
    this.ctx.fillStyle = ConfigService.config.pong.colors.walls;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
