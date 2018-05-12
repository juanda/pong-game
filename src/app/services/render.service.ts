import { Injectable } from '@angular/core';
import { Player } from '../game/player';

@Injectable()
export class RenderService {
  
  private ctx: CanvasRenderingContext2D
  private players: Player[]
  private canvasWidth: number
  private canvasHeight: number

  setPlayers(){
    this.players = []
    for(let i = 0; i < 50 ; i++){
      this.players.push(new Player(this.ctx))
    }
  }
  // Esta función debe llamarse al principio
  setCanvasContex(ctx){
    this.ctx = ctx
  }

  init() {  
    this.setPlayers()
    this.canvasWidth = this.ctx.canvas.width    
    this.canvasHeight = this.ctx.canvas.height    
    for(let player of this.players){
      player.init()
    }
  }

  update(step: number) {
    for(let player of this.players){
      player.update(step)
    }
  }

  render(dt: number) {
    this.ctx.clearRect(0,0, this.canvasWidth , this.canvasHeight)
    for(let player of this.players){
      player.render(dt)
    }
  }
}
