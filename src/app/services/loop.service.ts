import { Injectable } from "@angular/core"
import { WindowRefService } from "./window-ref.service"
import { FpsmeterService } from "./fpsmeter.service"
import { ConfigService } from "./config.service";

type RenderFunction = (number, CanvasRenderingContext2D) => void
type UpdateFunction = (number) => void

@Injectable()
export class LoopService {
  private fpsmeter: FPSMeter
  private frame: () => void

  constructor(
    private windowRef: WindowRefService,
    private fpsMeterService: FpsmeterService) {

    this.fpsmeter = new this.fpsMeterService.fpsMeter()
  }

  timestamp(){
    return this.windowRef.nativeWindow.performance.now()
  }

  run(update: UpdateFunction, render: RenderFunction,
    ctx: CanvasRenderingContext2D, running: boolean) {
    if(!running){
      return
    }
    var now,
      dt = 0,
      last = this.timestamp(),
      step = 1 / ConfigService.config.fps,
      update = update,
      render = render

    this.frame = () => {
      this.fpsmeter.tickStart();
      now = this.timestamp();
      dt = dt + Math.min(1, (now - last) / 1000);
      while (dt > step) {
        dt = dt - step;
        update(step);
      }
      render(dt, ctx);
      last = now;
      this.fpsmeter.tick();
      requestAnimationFrame(this.frame);
    }

    this.frame();
  }
}
