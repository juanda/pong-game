import { Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common"

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable()
export class WindowRefService {
  get nativeWindow(): any {    
    return _window();
  }

  get isPlatformBrowser(): boolean{
    return isPlatformBrowser(PLATFORM_ID)
  }
}
