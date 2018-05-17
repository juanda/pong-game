import { ConfigService } from "../services/config.service";

export class Court {
  private ww: number;
  private walls: { x: number; y: number; width: number; height: number }[];
  constructor(private ctx: CanvasRenderingContext2D) {}

  init() {
    var w: number = ConfigService.config.pong.width;
    var h: number = ConfigService.config.pong.height;
    var ww: number = ConfigService.config.pong.wallWidth;

    this.ww = ww;
    this.walls = [
      { x: 0, y: 0, width: w, height: ww },
      { x: 0, y: h - ww, width: w, height: ww }
    ];

    let nMax = h / (ww * 2);
    for (let n = 0; n < nMax; n++) {
      // draw dashed halfway line
      this.walls.push({
        x: w / 2 - ww / 2,
        y: ww / 2 + ww * 2 * n,
        width: ww,
        height: ww
      });
    }
  }

  render() {
    this.ctx.fillStyle = ConfigService.config.pong.colors.walls;
    for (var n = 0; n < this.walls.length; n++) {
      this.ctx.fillRect(
        this.walls[n].x,
        this.walls[n].y,
        this.walls[n].width,
        this.walls[n].height
      );
    }
  }
}
