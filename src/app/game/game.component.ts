import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone } from '@angular/core';
import { LoopService } from '../services/loop.service';
import { WindowRefService } from '../services/window-ref.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

 // http://teropa.info/blog/2016/12/12/graphics-in-angular-2.html#canvas-graphics
 @ViewChild('screen') canvasRef: ElementRef
 running: boolean
 width: number = 600
 height: number = 500

 constructor(
   private loop: LoopService,
   private ngZone: NgZone,
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
       this.loop.setCanvasContext(ctx)
       this.loop.run(this.running)
     }
   )
 }

 ngOnDestroy() {
   this.running = false
 }

}
