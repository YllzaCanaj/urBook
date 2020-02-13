import * as tslib_1 from "tslib";
import { Data } from './../../../providers/data';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';
let SelfEvaluationComponent = class SelfEvaluationComponent {
    constructor(translate, storage, sqlite, data, router) {
        this.translate = translate;
        this.storage = storage;
        this.sqlite = sqlite;
        this.data = data;
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
        this.data.initStorage();
    }
    ngOnInit() {
        this.sqlite.create({
            name: 'Urinebook.db',
            location: 'default'
        })
            .then((db) => {
            console.log('succes');
            this.db = db;
            db.executeSql('CREATE TABLE IF NOT EXISTS [userstable]' +
                '(id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'firstName text NOT NULL,' +
                'lastName text NOT NULL,' +
                'birthDate text NOT NULL,' +
                'age text NOT NULL,' +
                'height real NOT NULL,' +
                'weight real NOT NULL,' +
                'gender text NOT NULL,' +
                'bmi text NOT NULL,' +
                'medicalTherapy text NOT NULL)', []);
        });
    }
    goToQuestionnaire(questionnaire) {
        let user;
        this.data.getName().then((data) => {
            user = data;
            if (user.name) {
                this.router.navigate([questionnaire]);
            }
            else {
                this.translate.get('goToProfile').subscribe(value => {
                    alert(value);
                });
                this.router.navigate(['/profile']);
            }
        });
    }
};
SelfEvaluationComponent = tslib_1.__decorate([
    Component({
        selector: 'app-self-evaluation',
        templateUrl: './self-evaluation.component.html',
        styleUrls: ['./self-evaluation.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [TranslateService,
        Storage,
        SQLite,
        Data,
        Router])
], SelfEvaluationComponent);
export { SelfEvaluationComponent };
//# sourceMappingURL=self-evaluation.component.js.map