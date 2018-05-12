import { Injectable } from "@angular/core"
import { WindowRefService } from "./window-ref.service"
import { FpsmeterService } from "./fpsmeter.service"
import { ConfigService } from "./config.service";
import { RenderService } from "./render.service";

type RenderFunction = (number) => void
type UpdateFunction = (number) => void

@Injectable()
export class LoopService {
  private fpsmeter: FPSMeter
  private frame: () => void
  private ctx: CanvasRenderingContext2D

  constructor(
    private renderService: RenderService,
    private windowRef: WindowRefService,
    private fpsMeterService: FpsmeterService) {

    this.fpsmeter = new this.fpsMeterService.fpsMeter(null, { graph: 1, heat: 1 })
  }

  timestamp() {
    return this.windowRef.nativeWindow.performance.now()
  }

  setCanvasContext(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  run(running: boolean) {
    if (!running) {
      return
    }
    var now,
      dt = 0,
      last = this.timestamp(),
      step = 1 / ConfigService.config.fps

    this.renderService.setCanvasContex(this.ctx)
    this.renderService.init()

    this.frame = () => {
      this.fpsmeter.tickStart();
      now = this.timestamp();
      dt = dt + Math.min(1, (now - last) / 1000);
      while (dt > step) {
        dt = dt - step;
        this.renderService.update(step);
      }
      this.renderService.render(dt);
      last = now;
      this.fpsmeter.tick();
      requestAnimationFrame(this.frame);
    }

    this.frame();
  }
}
