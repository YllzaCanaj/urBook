import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';
let IleakedComponent = class IleakedComponent {
    constructor(translate, storage, sqlite, router) {
        this.translate = translate;
        this.storage = storage;
        this.sqlite = sqlite;
        this.router = router;
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
    onChangeHandler($event) { }
    selectDegree(level, logoUrl) {
        console.log('level: ', level);
        this.degree = level;
        this.degreUrl = logoUrl;
    }
    selectUrgency(level, logoUrl) {
        console.log('level: ', level);
        this.urgency = level;
        this.urgencyUrl = logoUrl;
    }
    selectCause(level, logoUrl) {
        console.log('level: ', level);
        this.cause = level;
        this.causeUrl = logoUrl;
    }
    iLeakeSave() {
        if (this.degree !== undefined || this.urgency !== undefined || this.cause !== undefined) {
            this.sqlite.create({
                name: 'Urinebook.db',
                location: 'default'
            })
                .then((db) => {
                this.db = db;
                console.log('succes method');
                const createdAt = Date.now();
                let sleepingPhase;
                if (localStorage.getItem('sleepingPhase')) {
                    sleepingPhase = 'Asleep';
                }
                else {
                    sleepingPhase = 'Awake';
                }
                // diary table insertion
                db.executeSql('INSERT INTO  [diary]' +
                    '(' +
                    '[TIME] ,' +
                    '[AWAKE_SLEEP])' +
                    'VALUES' +
                    '(' +
                    '"' + localStorage.getItem('time') + '",' +
                    '"' + sleepingPhase + '")', []).then((row) => {
                    //  console.log(row.insertId);
                    // leaks table insertion
                    db.executeSql('INSERT INTO [leaks]' +
                        '(' +
                        '[DEGREE],' +
                        '[DEGREE_LOGO_URL],' +
                        '[URGENCY],' +
                        '[URGENCY_LOGO_URL],' +
                        '[CAUSE],' +
                        '[CAUSE_LOGO_URL],' +
                        '[CREATED_AT], ' +
                        '[diary])' +
                        'VALUES' +
                        '(' +
                        '"' + this.degree + '",' +
                        '"' + this.degreUrl + '",' +
                        '"' + this.urgency + '",' +
                        '"' + this.urgencyUrl + '",' +
                        '"' + this.cause + '",' +
                        '"' + this.causeUrl + '",' +
                        '"' + createdAt + '",' +
                        '"' + row.insertId + '")', [])
                        .then(() => this.router.navigate(['/leake']))
                        .catch(e => console.log(e));
                });
            });
        }
        else {
            this.router.navigate(['/leake']);
        }
    }
    ngOnInit() {
    }
};
IleakedComponent = tslib_1.__decorate([
    Component({
        selector: 'app-ileaked',
        templateUrl: './ileaked.component.html',
        styleUrls: ['./ileaked.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [TranslateService, Storage, SQLite, Router])
], IleakedComponent);
export { IleakedComponent };
//# sourceMappingURL=ileaked.component.js.map