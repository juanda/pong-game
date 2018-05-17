import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoopService } from './services/loop.service';
import { WindowRefService } from './services/window-ref.service';
import { FpsmeterService } from './services/fpsmeter.service';
import { RenderService } from './services/render.service';
import { GameComponent } from './game/game.component';
import { PongService } from './pong/pong.service';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [ 
    LoopService,
    WindowRefService,
    FpsmeterService,
    RenderService,
    PongService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
