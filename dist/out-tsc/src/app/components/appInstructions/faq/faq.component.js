import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
let FaqComponent = class FaqComponent {
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
FaqComponent = tslib_1.__decorate([
    Component({
        selector: 'app-faq',
        templateUrl: './faq.component.html',
        styleUrls: ['./faq.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [TranslateService, Storage])
], FaqComponent);
export { FaqComponent };
//# sourceMappingURL=faq.component.js.map