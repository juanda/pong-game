import { Paddle } from './paddle';
import { Ball } from './ball';
export class Collision {

    constructor(private paddleLeft: Paddle,
        private paddleRight: Paddle,
        private ball: Ball) { }


    update() {

        let collisionLeft =
            (this.paddleLeft.x + this.paddleLeft.width >= this.ball.x)
            &&
            (this.ball.y + this.ball.radius / 2 >= this.paddleLeft.y)
            &&
            (this.ball.y <= this.paddleLeft.y + this.paddleLeft.height)

        let collisionRight =
            (this.paddleRight.x <= this.ball.x + this.ball.radius / 2)
            &&
            (this.ball.y + this.ball.radius / 2 >= this.paddleRight.y)
            &&
            (this.ball.y <= this.paddleRight.y + this.paddleRight.height)

        if (collisionLeft || collisionRight) {
            this.ball.setDir(-this.ball.dx, this.ball.dy)
        }
    }
}