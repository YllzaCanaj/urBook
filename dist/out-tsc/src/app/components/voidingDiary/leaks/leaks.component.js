import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite/ngx';
let LeaksComponent = class LeaksComponent {
    constructor(translate, storage, sqlite) {
        this.translate = translate;
        this.storage = storage;
        this.sqlite = sqlite;
        this.leek = [];
        this.aDay = 24 * 60 * 60 * 1000;
        this.icons = {
            'oneleak': './assets/img/pika.svg',
            'twoleak': './assets/img/onedrop.svg',
            'threeleak': './assets/img/manydrops.svg',
        };
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
        this.sqlite.create({
            name: 'Urinebook.db',
            location: 'default'
        })
            .then((db) => {
            db.executeSql('SELECT * FROM  leaks', []).then((data) => {
                if (data.rows.length > 0) {
                    for (let i = 0; i < data.rows.length; i++) {
                        console.log('item: ', data.rows.item(i));
                        this.leek.push(data.rows.item(i));
                        this.leek[i].CREATED_AT = this.time_ago(new Date(this.leek[i].CREATED_AT));
                    }
                    console.log('this.leek: ', this.leek);
                    // console.log('time here', this.time_ago(new Date(this.leek[0].CREATED_AT)))
                }
            });
        });
    }
    time_ago(time) {
        switch (typeof time) {
            case 'number':
                break;
            case 'string':
                time = +new Date(time);
                break;
            case 'object':
                if (time.constructor === Date)
                    time = time.getTime();
                break;
            default:
                time = +new Date();
        }
        var time_formats = [
            [60, 'seconds', 1],
            [120, '1 minute ago', '1 minute from now'],
            [3600, 'minutes', 60],
            [7200, '1 hour ago', '1 hour from now'],
            [86400, 'hours', 3600],
            [172800, 'Yesterday', 'Tomorrow'],
            [604800, 'days', 86400],
            [1209600, 'Last week', 'Next week'],
            [2419200, 'weeks', 604800],
            [4838400, 'Last month', 'Next month'],
            [29030400, 'months', 2419200],
            [58060800, 'Last year', 'Next year'],
            [2903040000, 'years', 29030400],
            [5806080000, 'Last century', 'Next century'],
            [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
        ];
        var seconds = (+new Date() - time) / 1000, token = 'ago', list_choice = 1;
        if (seconds == 0) {
            return 'Just now';
        }
        if (seconds < 0) {
            seconds = Math.abs(seconds);
            token = 'from now';
            list_choice = 2;
        }
        var i = 0, format;
        while (format = time_formats[i++])
            if (seconds < format[0]) {
                if (typeof format[2] == 'string')
                    return format[list_choice];
                else
                    return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
            }
        return time;
    }
};
LeaksComponent = tslib_1.__decorate([
    Component({
        selector: 'app-leaks',
        templateUrl: './leaks.component.html',
        styleUrls: ['./leaks.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [TranslateService, Storage, SQLite])
], LeaksComponent);
export { LeaksComponent };
//# sourceMappingURL=leaks.component.js.map