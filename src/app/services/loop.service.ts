import { Injectable } from "@angular/core"
import { WindowRefService } from "./window-ref.service"
import { FpsmeterService } from "./fpsmeter.service"
import { ConfigService } from "./config.service";

@Injectable()
export class LoopService {
  private now
  private fpsmeter
  private frame
  constructor(
    private windowRef: WindowRefService,
    private fpsMeterService: FpsmeterService
  ) {

    this.now = () => {
      return this.windowRef.nativeWindow.performance.now()
    }    
    this.fpsmeter = new this.fpsMeterService.fpsMeter()
  }

  run(update, render) {
    var now,
      dt = 0,
      last = this.now(),
      step = 1 / ConfigService.config.fps,
      update = update,
      render = render      

    this.frame = () => {
      this.fpsmeter.tickStart();
      now = this.now();
      dt = dt + Math.min(1, (now - last) / 1000);
      while (dt > step) {
        dt = dt - step;
        update(step);
      }
      render(dt);
      last = now;
      this.fpsmeter.tick();
      requestAnimationFrame(this.frame);
    }

    this.frame();
  }
}
