import { Injectable } from '@angular/core';
import { RunOptions } from './types';

@Injectable()
export class LoopService {

  constructor() { }

  run(options: RunOptions) {
    var now,
      dt = 0,
      last = window.performance.now(),
      step = 1 / options.fps,
      update = options.update,
      render = options.render,
      fpsmeter = options.fpsmeter;

    function frame() {
      fpsmeter.tickStart();
      now = window.performance.now();
      dt = dt + Math.min(1, (now - last) / 1000);
      while (dt > step) {
        dt = dt - step;
        update(step);
      }
      render(dt);
      last = now;
      fpsmeter.tick();
      requestAnimationFrame(frame);
    }

    frame();
  }

}
