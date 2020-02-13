import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
let SettingsComponent = class SettingsComponent {
    constructor(translate, storage) {
        this.translate = translate;
        this.storage = storage;
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
        this.lang = $event.target.value;
        this.storage.set('lang', this.lang);
        this.translate.use(this.lang);
    }
    ngOnInit() { }
};
SettingsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-settings',
        templateUrl: './settings.component.html',
        styleUrls: ['./settings.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [TranslateService, Storage])
], SettingsComponent);
export { SettingsComponent };
//# sourceMappingURL=settings.component.js.map