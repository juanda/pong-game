import { Injectable } from '@angular/core';
import { PongService } from '../pong/pong.service';

@Injectable()
export class RenderService {
  
  private ctx: CanvasRenderingContext2D
  private canvasWidth: number
  private canvasHeight: number

  constructor(private gameService: PongService){}
  
  // Esta función debe llamarse al principio
  setCanvasContex(ctx){
    this.ctx = ctx
  }

  init() {  
    this.gameService.setCanvasContex(this.ctx)
    this.gameService.init()
    this.canvasWidth = this.ctx.canvas.width    
    this.canvasHeight = this.ctx.canvas.height    
  }

  update(step: number) {
    this.gameService.update(step)
  }

  render(dt: number) {
    this.ctx.clearRect(0,0, this.canvasWidth , this.canvasHeight)
    this.gameService.render(dt)
  }
}
