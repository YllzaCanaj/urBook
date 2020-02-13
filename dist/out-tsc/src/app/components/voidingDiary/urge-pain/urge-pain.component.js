import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';
let UrgePainComponent = class UrgePainComponent {
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
    onChangeHandler($event) {
    }
    selectUrge(level, logoUrl) {
        console.log('level: ', logoUrl);
        this.urge = level;
        this.urgeUrl = logoUrl;
    }
    selectPain(level, logoUrl) {
        console.log('level: ', logoUrl);
        this.pain = level;
        this.painUrl = logoUrl;
    }
    submit() {
        if (localStorage.getItem('volume') === 'undefined') {
            this.router.navigate(['../Ipeed']);
        }
        else {
            this.ipeedInsertFn();
        }
    }
    ipeedInsertFn() {
        this.sqlite.create({
            name: 'Urinebook.db',
            location: 'default'
        })
            .then((db) => {
            this.db = db;
            console.log('succes method');
            console.log('volume: ', localStorage.getItem('volume'));
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
                // pees table insertion 
                db.executeSql('INSERT INTO [pees]' +
                    '(' +
                    '[VOLUME],' +
                    '[URGE],' +
                    '[URGE_LOGO_URL],' +
                    '[PAIN],' +
                    '[PAIN_LOGO_URL],' +
                    '[CREATED_AT], ' +
                    '[diary])' +
                    'VALUES' +
                    '(' +
                    '"' + localStorage.getItem('volume') + '",' +
                    '"' + this.urge + '",' +
                    '"' + this.urgeUrl + '",' +
                    '"' + this.pain + '",' +
                    '"' + this.painUrl + '",' +
                    '"' + createdAt + '",' +
                    '"' + row.insertId + '")', [])
                    .then(() => {
                    this.router.navigate(['../peed']);
                    // alert('Data insert is done in intakes table')
                })
                    .catch(e => console.log(e));
            });
        });
    }
    ngOnInit() {
        // this.sqlite.create({
        //   name: 'Urinebook.db',
        //   location: 'default'
        // })
        //   .then((db) => {
        //     console.log('succes');
        //     db.executeSql('drop table  pees', []).then((data) => {
        //         alert("test 1   " + JSON.stringify(data.rows.item(1)));
        //         console.log("ggggggggggggg");
        //       })
        //   });
    }
};
UrgePainComponent = tslib_1.__decorate([
    Component({
        selector: 'app-urge-pain',
        templateUrl: './urge-pain.component.html',
        styleUrls: ['./urge-pain.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Router, TranslateService, Storage, SQLite])
], UrgePainComponent);
export { UrgePainComponent };
//# sourceMappingURL=urge-pain.component.js.map