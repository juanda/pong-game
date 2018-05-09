import { Component } from '@angular/core';
import { LoopService } from './loop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private loop: LoopService){}

  ngOnInit(){
    this.loop.run()
  }
}
