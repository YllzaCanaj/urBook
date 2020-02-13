import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { AlertController } from '@ionic/angular';
let NewEventComponent = class NewEventComponent {
    constructor(translate, storage, sqlite, alertController) {
        this.translate = translate;
        this.storage = storage;
        this.sqlite = sqlite;
        this.alertController = alertController;
        this.sleepingPhase = false;
        this.canceledAlert = false;
        this.timeType = 'now';
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
    presentAlertConfirm(sleepingCondition) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let sleepingPhaseText, alertContent, noText, yesText;
            this.translate.get('sleepingPhase').subscribe(value => {
                sleepingPhaseText = value;
            });
            if (sleepingCondition) {
                this.translate.get('awakeContent').subscribe(value => {
                    alertContent = value;
                });
            }
            else {
                this.translate.get('asleepContent').subscribe(value => {
                    alertContent = value;
                });
            }
            this.translate.get('noText').subscribe(value => {
                noText = value;
            });
            this.translate.get('yesText').subscribe(value => {
                yesText = value;
            });
            const alert = yield this.alertController.create({
                header: sleepingPhaseText,
                message: alertContent,
                buttons: [
                    {
                        text: noText,
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            this.sleepingPhase = !sleepingCondition;
                            this.canceledAlert = true;
                        }
                    }, {
                        text: yesText,
                        handler: () => {
                            this.sleepingPhase = sleepingCondition;
                            console.log('sleepingCondition: ', sleepingCondition);
                            localStorage.setItem('sleepingPhase', sleepingCondition);
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    onTimeChange($event) {
        const newDate = new Date($event);
        this.time = newDate.toLocaleString();
        console.log('time: ', this.time);
        localStorage.setItem('time', this.time);
    }
    onSleepingChange(event) {
        // true means awake, false means asleep
        if (this.canceledAlert) {
            this.presentAlertConfirm(event.detail.checked);
        }
        else {
            this.canceledAlert = true;
        }
    }
    onChangeTimeType($event) {
        console.log($event.target.value);
        this.timeType = $event.target.value;
        if (this.timeType === 'now') {
            const newDate = new Date();
            this.time = newDate.toLocaleString();
            console.log('time: ', this.time);
            localStorage.setItem('time', this.time);
        }
    }
    ngOnInit() {
        const newDate = new Date();
        this.time = newDate.toLocaleString();
        console.log('time: ', this.time);
        localStorage.setItem('time', this.time);
    }
};
NewEventComponent = tslib_1.__decorate([
    Component({
        selector: 'app-new-event',
        templateUrl: './new-event.component.html',
        styleUrls: ['./new-event.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [TranslateService,
        Storage,
        SQLite,
        AlertController])
], NewEventComponent);
export { NewEventComponent };
//# sourceMappingURL=new-event.component.js.map