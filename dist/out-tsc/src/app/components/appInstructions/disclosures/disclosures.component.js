import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
let DisclosuresComponent = class DisclosuresComponent {
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
    ngOnInit() { }
};
DisclosuresComponent = tslib_1.__decorate([
    Component({
        selector: 'app-disclosures',
        templateUrl: './disclosures.component.html',
        styleUrls: ['./disclosures.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [TranslateService, Storage])
], DisclosuresComponent);
export { DisclosuresComponent };
//# sourceMappingURL=disclosures.component.js.map