import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
let IdrankComponent = class IdrankComponent {
    constructor(translate, router, storage, sqlite) {
        this.translate = translate;
        this.router = router;
        this.storage = storage;
        this.sqlite = sqlite;
        this.key = 'userName';
        // Setting language
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
    iDrankSave(rawItem, quantity, logoUrl) {
        console.log('time: ', localStorage.getItem('time'));
        console.log('sleeping phase: ', localStorage.getItem('sleepingPhase'));
        let createdAt = Date.now();
        let item;
        this.translate.get(rawItem).subscribe(value => {
            item = value;
        });
        console.log('item: ', item);
        console.log('quantity: ', quantity);
        this.sqlite.create({
            name: 'Urinebook.db',
            location: 'default'
        })
            .then((db) => {
            this.db = db;
            let sleepingPhase;
            if (localStorage.getItem('sleepingPhase')) {
                this.translate.get('Asleep').subscribe(value => {
                    sleepingPhase = value;
                });
            }
            else {
                this.translate.get('Awake').subscribe(value => {
                    sleepingPhase = value;
                });
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
                // intake table insertion
                db.executeSql('INSERT INTO [intakes]' +
                    '(' +
                    '[VOLUME],' +
                    '[TYPE],' +
                    '[LOGO_URL],' +
                    '[CREATED_AT],' +
                    '[diary])' +
                    'VALUES' +
                    '(' +
                    '"' + quantity + '",' +
                    '"' + item + '",' +
                    '"' + logoUrl + '",' +
                    '"' + createdAt + '",' +
                    '"' + row.insertId + '")', [])
                    .then(() => {
                    this.router.navigate(['../drank']);
                    // alert('Data insert is done in intakes table')
                })
                    .catch(e => console.log(e));
            });
        });
    }
    ngOnInit() { }
};
IdrankComponent = tslib_1.__decorate([
    Component({
        selector: 'app-idrank',
        templateUrl: './idrank.component.html',
        styleUrls: ['./idrank.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [TranslateService, Router,
        Storage,
        SQLite])
], IdrankComponent);
export { IdrankComponent };
//# sourceMappingURL=idrank.component.js.map