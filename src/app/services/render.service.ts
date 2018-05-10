import { Injectable } from '@angular/core';

@Injectable()
export class RenderService {

  init(ctx: CanvasRenderingContext2D) {

  }

  update(step: number) {

  }

  render(dt: number, ctx: CanvasRenderingContext2D) {
    let canvas = ctx.canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(25 + 100 * dt, 25, 100, 100);
  }
}
