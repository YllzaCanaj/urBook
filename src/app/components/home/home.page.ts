import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {
  db: SQLiteObject;
  lang: any;
  constructor(public translate: TranslateService, private storage: Storage, private sqlite: SQLite) {
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
}
