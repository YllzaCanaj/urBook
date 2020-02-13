import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-disclosures',
  templateUrl: './disclosures.component.html',
  styleUrls: ['./disclosures.component.scss'],
})
export class DisclosuresComponent implements OnInit {

  lang: any;
  constructor(public translate: TranslateService, private storage: Storage) {
    this.storage.ready().then(() => {
      this.storage.get('lang').then((lang) => {
        if (lang) {
          this.lang = lang;
        } else {
          this.storage.set('lang', 'it');
          this.lang = 'it';
        }
        this.translate.setDefaultLang('en');
        this.translate.use(this.lang);
      });
    });
  }

  ngOnInit() {}

}
