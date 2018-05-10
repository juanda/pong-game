import { Injectable } from "@angular/core";

@Injectable()
export class ConfigService {
  static config;

  static load() {
    const jsonFile = `assets/config.json`;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.overrideMimeType("application/json");
      xhr.open("GET", jsonFile, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            ConfigService.config = JSON.parse(xhr.responseText);
            resolve();
          } else {
            reject(`Could not load file '${jsonFile}': ${xhr.status}`);
          }
        }
      };
      xhr.send(null);
    });
  }
}
