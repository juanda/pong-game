import { IUpdateable } from "./IUpdateable";

export class Ball implements IUpdateable{

    x: number
    y: number

    constructor(private ctx: CanvasRenderingContext2D){}

    setPos(x: number, y: number){
        this.x = x
        this.y = y
    }

    init(){}
    update(step: number){}
    render(dt: number){}
}