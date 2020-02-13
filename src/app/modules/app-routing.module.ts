import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {SelfEvaluationComponent} from '.././components/self-evaluation/self-evaluation.component';
import {YourProfileComponent} from '.././components/your-profile/your-profile.component';
import {SettingsComponent} from '.././components/settings/settings.component';
import {IciqSfComponent} from '../components/questionaries/iciq-sf.component';
import { HomePage } from '../components/home/home.page';
import { InstructionsComponent } from '../components/appInstructions/instructions/instructions.component';
import { FaqComponent } from '../components/appInstructions/faq/faq.component';
import { DisclosuresComponent } from '../components/appInstructions/disclosures/disclosures.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', },
  { path: 'home', component: HomePage},
  { path: 'selfEvaluation', component: SelfEvaluationComponent },
  { path: 'profile', component: YourProfileComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'iciq-sf', component: IciqSfComponent },
  { path: 'istructions', component: InstructionsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'disclosure', component: DisclosuresComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
