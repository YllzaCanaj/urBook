import * as tslib_1 from "tslib";
import { OabComponent } from './../components/questionaries/oab/oab.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { SelfEvaluationComponent } from '.././components/self-evaluation/self-evaluation.component';
import { VoidingDairyComponent } from '../components/voidingDiary/voiding-dairy/voiding-dairy.component';
import { YourProfileComponent } from '.././components/your-profile/your-profile.component';
import { SettingsComponent } from '.././components/settings/settings.component';
import { WelcomePageComponent } from '../components/welcome-page/welcome-page.component';
import { NewEventComponent } from '../components/voidingDiary/new-event/new-event.component';
import { IciqSfComponent } from '../components/questionaries/iciq-sf/iciq-sf.component';
import { IPSSComponent } from '../components/questionaries/ipss/ipss.component';
import { LitwinComponent } from '../components/questionaries/litwin/litwin.component';
import { HomePage } from '../components/home/home.page';
import { InstructionsComponent } from '../components/appInstructions/instructions/instructions.component';
import { FaqComponent } from '../components/appInstructions/faq/faq.component';
import { DisclosuresComponent } from '../components/appInstructions/disclosures/disclosures.component';
import { StartNewEventComponent } from '../components/voidingDiary/start-new-event/start-new-event.component';
import { StartNewEventSecondPageComponent } from '../components/voidingDiary/start-new-event-second-page/start-new-event-second-page.component';
import { IdrankComponent } from '../components/voidingDiary/idrank/idrank.component';
import { IleakedComponent } from '../components/voidingDiary/ileaked/ileaked.component';
import { IpeedComponent } from '../components/voidingDiary/ipeed/ipeed.component';
import { UrgePainComponent } from '../components/voidingDiary/urge-pain/urge-pain.component';
import { LeaksComponent } from '../components/voidingDiary/leaks/leaks.component';
import { DrankComponent } from '../components/voidingDiary/drank/drank.component';
import { PeedComponent } from '../components/voidingDiary/peed/peed.component';
const routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full', },
    { path: 'home', component: HomePage },
    { path: 'selfEvaluation', component: SelfEvaluationComponent },
    { path: 'voidingDairy', component: VoidingDairyComponent },
    { path: 'profile', component: YourProfileComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'welcome', component: WelcomePageComponent },
    { path: 'newEvent', component: NewEventComponent },
    { path: 'iciq-sf', component: IciqSfComponent },
    { path: 'ipss', component: IPSSComponent },
    { path: 'oab', component: OabComponent },
    { path: 'litwin', component: LitwinComponent },
    { path: 'istructions', component: InstructionsComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'disclosure', component: DisclosuresComponent },
    { path: 'startNewEvent', component: StartNewEventComponent },
    { path: 'startNewEvent2', component: StartNewEventSecondPageComponent },
    { path: 'Ipeed', component: IpeedComponent },
    { path: 'Idrank', component: IdrankComponent },
    { path: 'Ileaked', component: IleakedComponent },
    { path: 'urgePain', component: UrgePainComponent },
    { path: 'leake', component: LeaksComponent },
    { path: 'drank', component: DrankComponent },
    { path: 'peed', component: PeedComponent }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
        ],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map