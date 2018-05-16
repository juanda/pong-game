import { Injectable } from '@angular/core';
import { Player } from './player';
import { IUpdateable } from './IUpdateable';
import { WindowRefService } from '../services/window-ref.service';

@Injectable()
export class GameService implements IUpdateable{
  private players: Player[]
  private ctx: CanvasRenderingContext2D

  constructor(private windowRefService: WindowRefService){}

  setCanvasContex(ctx){
    this.ctx = ctx
  }

  setControls(player1: Player, player2: Player){
    let d = this.windowRefService.nativeWindow.document

    d.addEventListener('keyup', (e) => {
      console.log('keyup ' + e.key)
      if(e.key == "q") player1.setUp(false)
      if(e.key == "p") player2.setUp(false)
    })

    d.addEventListener('keydown', (e) => {
      console.log('keydown ' + e.key)
      if(e.key == "q") player1.setUp(true)
      if(e.key == "p") player2.setUp(true)
    })
  }

  setPlayers(){
    this.players = []
    for(let i = 0; i < 100 ; i++){
      this.players.push(new Player(i.toString(), this.ctx))
    }
  }

  init(){
    this.setPlayers()
    this.setControls(this.players[0], this.players[1])
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
