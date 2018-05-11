import { Component, ViewChild, ElementRef, NgZone, OnInit, OnDestroy } from '@angular/core';
import { LoopService } from './services/loop.service';
import { ConfigService } from './services/config.service';
import { RenderService } from './services/render.service'
import { WindowRefService } from './services/window-ref.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'pong'
  // http://teropa.info/blog/2016/12/12/graphics-in-angular-2.html#canvas-graphics
  @ViewChild('screen') canvasRef: ElementRef
  running: boolean
  width: number = 600
  height: number = 500

  constructor(
    private loop: LoopService,
    private ngZone: NgZone,
    private renderService: RenderService,
    private windowService: WindowRefService) {
    let window = this.windowService.nativeWindow
    this.width = window.innerWidth - 20
    this.height = window.innerHeight - 10
  }

  ngOnInit() {
    this.canvasRef.nativeElement.width = this.width
    this.canvasRef.nativeElement.height = this.height
    this.running = true;
    let ctx: CanvasRenderingContext2D =
      this.canvasRef.nativeElement.getContext('2d')
    // Esto mejora la performance de la aplicación. La razón se
    // explica en la url del anterior comentario
    this.ngZone.runOutsideAngular(

      () => {
        this.renderService.setCanvasContex(ctx)
        this.renderService.setPlayers()
        this.renderService.init()
        this.loop.run(this.running)
      }
    )
  }

  ngOnDestroy() {
    this.running = false
  }
}
