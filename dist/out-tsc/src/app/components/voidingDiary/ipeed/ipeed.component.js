import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite/ngx';
let IpeedComponent = class IpeedComponent {
    constructor(translate, storage, sqlite) {
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
    getVolume() {
        console.log('getVolume():', this.volume);
        localStorage.setItem('volume', this.volume);
    }
    volumeSave() {
        console.log('volume:', this.volume);
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
                // pees table insertion 
                db.executeSql('INSERT INTO [pees]' +
                    '(' +
                    '[VOLUME],' +
                    '[URGE],' +
                    '[PAIN],' +
                    '[CREATED_AT], ' +
                    '[diary])' +
                    'VALUES' +
                    '(' +
                    '"' + this.volume + '",' +
                    'NULL,' +
                    'NULL,' +
                    '"' + createdAt + '",' +
                    '"' + row.insertId + '")', [])
                    .then(() => console.log('Data insert is done in pees table'))
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
        //     db.executeSql('SELECT * FROM  pees', []).then((data) => {
        //         alert("test 1   " + JSON.stringify(data.rows.item(3)));
        //         console.log("ggggggggggggg");
        //       })
        //   });
    }
};
IpeedComponent = tslib_1.__decorate([
    Component({
        selector: 'app-ipeed',
        templateUrl: './ipeed.component.html',
        styleUrls: ['./ipeed.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [TranslateService, Storage, SQLite])
], IpeedComponent);
export { IpeedComponent };
//# sourceMappingURL=ipeed.component.js.map