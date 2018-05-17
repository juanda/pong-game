import { IUpdateable } from "./IUpdateable";
import { Ball } from "./ball";
import { ConfigService } from "../services/config.service";
import { Paddle } from "./paddle";

export class Counter implements IUpdateable {
  private ww: number;
  private score1: { x: number; y: number; w: number; h: number };
  private score2: { x: number; y: number; w: number; h: number };
  private points1: number
  private points2: number

  constructor(private ctx: CanvasRenderingContext2D, 
    private paddleLeft: Paddle,
    private paddleRight: Paddle,
    private ball: Ball) {
    this.ww = ConfigService.config.pong.wallWidth;
  }

  drawDigit(n, x, y, w, h) {
    this.ctx.fillStyle = ConfigService.config.pong.colors.score;

    let dw = this.ww * 4 / 5;
    let dh = dw;
    const DIGITS = [
      [1, 1, 1, 0, 1, 1, 1], // 0
      [0, 0, 1, 0, 0, 1, 0], // 1
      [1, 0, 1, 1, 1, 0, 1], // 2
      [1, 0, 1, 1, 0, 1, 1], // 3
      [0, 1, 1, 1, 0, 1, 0], // 4
      [1, 1, 0, 1, 0, 1, 1], // 5
      [1, 1, 0, 1, 1, 1, 1], // 6
      [1, 0, 1, 0, 0, 1, 0], // 7
      [1, 1, 1, 1, 1, 1, 1], // 8
      [1, 1, 1, 1, 0, 1, 0] // 9
    ];
    var blocks = DIGITS[n];
    if (blocks[0]) this.ctx.fillRect(x, y, w, dh);
    if (blocks[1]) this.ctx.fillRect(x, y, dw, h / 2);
    if (blocks[2]) this.ctx.fillRect(x + w - dw, y, dw, h / 2);
    if (blocks[3]) this.ctx.fillRect(x, y + h / 2 - dh / 2, w, dh);
    if (blocks[4]) this.ctx.fillRect(x, y + h / 2, dw, h / 2);
    if (blocks[5]) this.ctx.fillRect(x + w - dw, y + h / 2, dw, h / 2);
    if (blocks[6]) this.ctx.fillRect(x, y + h - dh, w, dh);
  }

  init() {
    let w = ConfigService.config.pong.width;
    let sw = 3 * this.ww;
    let sh = 4 * this.ww;
    this.score1 = {
      x: 0.5 + w / 2 - 1.5 * this.ww - sw,
      y: 2 * this.ww,
      w: sw,
      h: sh
    }
    this.score2 = {
      x: 0.5 + w / 2 + 1.5 * this.ww,
      y: 2 * this.ww,
      w: sw,
      h: sh
    }
    this.points1 = 0
    this.points2 = 0
  }

  update(step: number) {
      if(this.ball.x < this.paddleLeft.x){
          this.points2 ++;
          this.ball.reset(1)
      }
      if(this.ball.x > this.paddleRight.x + this.paddleRight.width){
        this.points1 ++;
        this.ball.reset(2)
    }    

    if(this.points1 == 9 || this.points2 == 9){ 
      this.points1 = this.points2 = 0;
      this.ball.reset(1)
    }
  }

  render(dt: number) {
    this.drawDigit(this.points1, this.score1.x, this.score1.y, this.score1.w, this.score1.h);
    this.drawDigit(this.points2, this.score2.x, this.score2.y, this.score2.w, this.score2.h);
  }
}
