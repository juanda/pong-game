import { Injectable } from '@angular/core';
import { IUpdateable } from './IUpdateable';
import { WindowRefService } from '../services/window-ref.service';
import { Paddle } from './paddle';
import { ConfigService } from '../services/config.service'
import { Ball } from './ball';
import { Collision } from './collision';
import { Counter } from './counter';
import { Court } from './court';

@Injectable()
export class PongService implements IUpdateable{
  private paddleLeft: Paddle
  private paddleRight: Paddle
  private ball: Ball
  private collision: Collision
  private counter: Counter
  private court: Court
  private ctx: CanvasRenderingContext2D

  constructor(private windowRefService: WindowRefService){}

  setCanvasContex(ctx){
    this.ctx = ctx
    this.ctx.canvas.width = ConfigService.config.pong.width
    this.ctx.canvas.height = ConfigService.config.pong.height
  }

  setControls(paddleLeft: Paddle, paddleRight: Paddle){
    let d = this.windowRefService.nativeWindow.document

    d.addEventListener('keydown', (e) => {
      console.log('keydown ' + e.key)
      if(e.key == "q") paddleLeft.moveUp()
      if(e.key == "p") paddleRight.moveUp()
      if(e.key == "a") paddleLeft.moveDown()
      if(e.key == "l") paddleRight.moveDown()
    })

    d.addEventListener('keyup', (e) => {
      console.log('keyup ' + e.key)
      if(e.key == "q") paddleLeft.stopMovingUp()
      if(e.key == "p") paddleRight.stopMovingUp()
      if(e.key == "a") paddleLeft.stopMovingDown()
      if(e.key == "l") paddleRight.stopMovingDown()
    })
  }


  init(){
    // Court
    this.court = new Court(this.ctx)
    this.court.init()
    // Paddles
    this.paddleLeft = new Paddle(this.ctx)
    this.paddleRight = new Paddle(this.ctx)
    this.setControls(this.paddleLeft, this.paddleRight)
    this.paddleLeft.init()
    this.paddleRight.init()
    this.paddleLeft.setPos(0, (this.paddleLeft.maxY - this.paddleLeft.minY)/2)
    this.paddleRight.setPos(ConfigService.config.pong.width - this.paddleRight.width, (this.paddleLeft.maxY - this.paddleLeft.minY)/2)    
    
    // Ball
    this.ball = new Ball(this.ctx)
    this.ball.init()

    // Collision
    this.collision = new Collision(this.paddleLeft, this.paddleRight, this.ball)

    // Counter

    this.counter = new Counter(this.ctx, this.paddleLeft, this.paddleRight, this.ball)
    this.counter.init()
  }

  update(step: number){
    this.collision.update()
    this.counter.update(step)
    this.paddleLeft.update(step)
    this.paddleRight.update(step)
    this.ball.update(step)
  }
  
  render(dt: number){
    this.court.render()
    this.counter.render(dt)
    this.paddleLeft.render(dt)
    this.paddleRight.render(dt)
    this.ball.render(dt)
  }

}
