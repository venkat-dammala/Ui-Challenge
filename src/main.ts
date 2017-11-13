import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {LicenseManager} from "ag-grid-enterprise/main";

LicenseManager.setLicenseKey("ag-Grid_Evaluation_License_Key_Not_for_Production_1Devs10_January_2018__MTUxNTU0MjQwMDAwMA==8830dbe7d628f87ebb04ff34328f72eb");

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
