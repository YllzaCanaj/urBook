import { HomePage } from './../components/home/home.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Location } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SettingsComponent } from '../components/settings/settings.component';
import { YourProfileComponent } from '../components/your-profile/your-profile.component';
import { SelfEvaluationComponent } from '../components/self-evaluation/self-evaluation.component';
import { RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from '../components/app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Data } from '../../../src/providers/data';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IciqSfComponent } from '../components/questionaries/iciq-sf.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InstructionsComponent } from '../components/appInstructions/instructions/instructions.component';
import { FaqComponent } from '../components/appInstructions/faq/faq.component';
import { DisclosuresComponent } from '../components/appInstructions/disclosures/disclosures.component';
import { DecimalPipe } from '@angular/common';

import { File } from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';

import { from } from 'rxjs';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './../assets/i18n/', '.json');
}

@NgModule({
  declarations:
    [
      AppComponent,
      HomePage,
      SelfEvaluationComponent,
      YourProfileComponent,
      SettingsComponent,
      IciqSfComponent,
      DisclosuresComponent,
      FaqComponent,
      InstructionsComponent
    ],
  entryComponents: [],

  imports:
    [ReactiveFormsModule,
      FormsModule,
      MatRadioModule,
      HttpModule,
      HttpClientModule,
      BrowserModule,
      AppRoutingModule,
      RouterModule,
      IonicModule.forRoot({ backButtonText: '', }),
      IonicStorageModule.forRoot(),
      BrowserAnimationsModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      })
    ],
  providers:
    [
      SQLite,
     // Storage,
      StatusBar,
      Location,
      Data,
      SplashScreen,
      File,
      FileOpener,
      DocumentViewer,
      DecimalPipe,
      {
        provide: RouteReuseStrategy,
        useClass: IonicRouteStrategy
      }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
