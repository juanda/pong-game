import { Injectable } from '@angular/core';
import { Player } from './player';
import { IUpdateable } from './IUpdateable';

@Injectable()
export class GameService implements IUpdateable{
  private players: Player[]
  private ctx: CanvasRenderingContext2D

  setCanvasContex(ctx){
    this.ctx = ctx
  }

  setPlayers(){
    this.players = []
    for(let i = 0; i < 50 ; i++){
      this.players.push(new Player(this.ctx))
    }
  }

  init(){
    this.setPlayers()
    for(let player of this.players){
      player.init()
    }
  }

  update(step: number){
    for(let player of this.players){
      player.update(step)
    }
  }
  
  render(dt: number){
    for(let player of this.players){
      player.render(dt)
    }
  }

}
