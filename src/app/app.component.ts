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
export class AppComponent   {
  name = 'Pong'
}
