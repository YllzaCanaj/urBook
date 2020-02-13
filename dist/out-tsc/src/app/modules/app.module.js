import * as tslib_1 from "tslib";
import { HomePage } from './../components/home/home.page';
import { OabComponent } from './../components/questionaries/oab/oab.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Location } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { NewEventComponent } from '../components/voidingDiary/new-event/new-event.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { WelcomePageComponent } from '../components/welcome-page/welcome-page.component';
import { YourProfileComponent } from '../components/your-profile/your-profile.component';
import { SelfEvaluationComponent } from '../components/self-evaluation/self-evaluation.component';
import { RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from '../components/app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { VoidingDairyComponent } from '../components/voidingDiary/voiding-dairy/voiding-dairy.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Data } from '../../../src/providers/data';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IPSSComponent } from '../components/questionaries/ipss/ipss.component';
import { IciqSfComponent } from '../components/questionaries/iciq-sf/iciq-sf.component';
import { LitwinComponent } from '../components/questionaries/litwin/litwin.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InstructionsComponent } from '../components/appInstructions/instructions/instructions.component';
import { FaqComponent } from '../components/appInstructions/faq/faq.component';
import { DisclosuresComponent } from '../components/appInstructions/disclosures/disclosures.component';
import { StartNewEventComponent } from '../components/voidingDiary/start-new-event/start-new-event.component';
import { StartNewEventSecondPageComponent } from '../components/voidingDiary/start-new-event-second-page/start-new-event-second-page.component';
import { IdrankComponent } from '../components/voidingDiary/idrank/idrank.component';
import { DrankComponent } from '../components/voidingDiary/drank/drank.component';
import { PeedComponent } from '../components/voidingDiary/peed/peed.component';
import { IleakedComponent } from '../components/voidingDiary/ileaked/ileaked.component';
import { IpeedComponent } from '../components/voidingDiary/ipeed/ipeed.component';
import { UrgePainComponent } from '../components/voidingDiary/urge-pain/urge-pain.component';
import { LeaksComponent } from '../components/voidingDiary/leaks/leaks.component';
import { DecimalPipe } from '@angular/common';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
export function createTranslateLoader(http) {
    return new TranslateHttpLoader(http, './../assets/i18n/', '.json');
}
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent,
            IdrankComponent,
            DrankComponent,
            UrgePainComponent,
            PeedComponent,
            LeaksComponent,
            IpeedComponent,
            IleakedComponent,
            StartNewEventComponent,
            StartNewEventSecondPageComponent,
            HomePage,
            SelfEvaluationComponent,
            VoidingDairyComponent,
            YourProfileComponent,
            SettingsComponent,
            WelcomePageComponent,
            LitwinComponent,
            IciqSfComponent,
            IPSSComponent,
            OabComponent,
            NewEventComponent,
            DisclosuresComponent,
            FaqComponent,
            InstructionsComponent
        ],
        entryComponents: [],
        imports: [ReactiveFormsModule,
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
        providers: [
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map