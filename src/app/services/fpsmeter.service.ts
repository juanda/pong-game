import { Injectable } from '@angular/core';
import 'fpsmeter'

@Injectable()
export class FpsmeterService {
  
  get fpsMeter(){
    return FPSMeter
  }

}
