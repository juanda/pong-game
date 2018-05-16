import { IUpdateable } from "./IUpdateable";
import { ConfigService } from '../services/config.service';

export class Ball implements IUpdateable {

    x: number
    y: number
    dx: number
    dy: number
    radius: number
    private left: number
    private right: number
    private top: number
    private bottom: number
    private minX: number
    private maxX: number
    private minY: number
    private maxY: number
    private speed: number
    private accel: number

    constructor(private ctx: CanvasRenderingContext2D) {
        this.radius = ConfigService.config.pong.ballRadius
        this.minX = this.radius;
        this.maxX = ConfigService.config.pong.width - this.radius;
        this.minY = ConfigService.config.pong.wallWidth + this.radius;
        this.maxY = ConfigService.config.pong.height - ConfigService.config.pong.wallWidth - this.radius;
        this.speed = (this.maxX - this.minX) / ConfigService.config.pong.ballSpeed;
        this.accel = 1 //ConfigService.config.pong.ballAccel;
    }

    setPos(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.left = this.x - this.radius;
        this.top = this.y - this.radius;
        this.right = this.x + this.radius;
        this.bottom = this.y + this.radius;
    }

    setDir(dx: number, dy: number) {
        this.dx = dx;
        this.dy = dy;
    }

    accelerate(x, y, dx, dy, accel, dt) {
        var x2 = x + (dt * dx) + (accel * dt * dt * 0.5);
        var y2 = y + (dt * dy) + (accel * dt * dt * 0.5);
        var dx2 = dx + (accel * dt) * (dx > 0 ? 1 : -1);
        var dy2 = dy + (accel * dt) * (dy > 0 ? 1 : -1);
        return { nx: (x2 - x), ny: (y2 - y), x: x2, y: y2, dx: dx2, dy: dy2 };
    }

    reset(playerNo) {
        let random = function (min, max) {
            return (min + (Math.random() * (max - min)));
        }
        let w = ConfigService.config.pong.paddleWidth
        this.setPos(playerNo == 1 ? this.maxX -  w: this.minX + w, random(this.minY, this.maxY));
        this.setDir(playerNo == 1 ? -this.speed : this.speed, this.speed);
    }

    init() {
        this.reset(1)
    }

    update(step: number) {
        let pos = this.accelerate(this.x, this.y, this.dx, this.dy, this.accel, step);

        if ((pos.dy > 0) && (pos.y > this.maxY)) {
            pos.y = this.maxY;
            pos.dy = -pos.dy;
        }
        else if ((pos.dy < 0) && (pos.y < this.minY)) {
            pos.y = this.minY;
            pos.dy = -pos.dy;
        }

        this.setPos(pos.x, pos.y);
        this.setDir(pos.dx, pos.dy);
    }
    render(dt: number) {
        let w = this.radius * 2
        let h = w
        this.ctx.fillStyle = ConfigService.config.pong.colors.ball;
        this.ctx.fillRect(this.x - this.radius, this.y - this.radius, w, h);
    }
}