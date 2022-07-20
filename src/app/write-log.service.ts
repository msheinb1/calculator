import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WriteLogService {

  writeLog(message: string) { console.log(message); }
  writeError(message: string) { console.log('Error: ' + message) }

  constructor() { }
}
