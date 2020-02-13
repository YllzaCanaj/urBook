import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';
let StartNewEventComponent = class StartNewEventComponent {
    constructor(router, translate, storage, sqlite) {
        this.router = router;
        this.translate = translate;
        this.storage = storage;
        this.sqlite = sqlite;
        this.storage.ready().then(() => {
            this.storage.get('lang').then((lang) => {
                if (lang) {
                    this.lang = lang;
                }
                else {
                    this.storage.set('lang', 'it');
                    this.lang = 'it';
                }
                this.translate.setDefaultLang('en');
                this.translate.use(this.lang);
            });
        });
    }
    ngOnInit() {
        //     this.sqlite.create({
        //   name: 'Urinebook.db',
        //   location: 'default'
        // })
        //   .then((db) => {
        //     console.log('succes');
        //     db.executeSql('drop table  diary', []).then((data) => {
        //         alert("test 1   " + JSON.stringify(data.rows.item(1)));
        //         console.log("ggggggggggggg");
        //       })
        //   });
    }
    createNew() {
        this.sqlite.create({
            name: 'Urinebook.db',
            location: 'default'
        })
            .then((db) => {
            db.executeSql('delete table intakes', []).then((data) => {
                this.router.navigate(['/startNewEvent2']);
            });
        });
    }
};
StartNewEventComponent = tslib_1.__decorate([
    Component({
        selector: 'app-start-new-event',
        templateUrl: './start-new-event.component.html',
        styleUrls: ['./start-new-event.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Router, TranslateService, Storage, SQLite])
], StartNewEventComponent);
export { StartNewEventComponent };
//# sourceMappingURL=start-new-event.component.js.map