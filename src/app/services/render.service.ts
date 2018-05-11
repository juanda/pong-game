import { Injectable } from '@angular/core';
import { Player } from '../game/player';

@Injectable()
export class RenderService {
  
  private ctx: CanvasRenderingContext2D
  private players: Player[]

  setPlayers(){
    let player1 = new Player(this.ctx)
    let player2 = new Player(this.ctx)
    this.players = [player1, player2]
  }
  // Esta función debe llamarse al principio
  setCanvasContex(ctx){
    this.ctx = ctx
  }

  init() {      
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

    for(let player of this.players){
      player.render(dt)
    }
  }
}
