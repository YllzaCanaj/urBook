import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Router } from '@angular/router';
let StartNewEventSecondPageComponent = class StartNewEventSecondPageComponent {
    constructor(translate, storage, sqlite, platform, file, fileOpener, router) {
        this.translate = translate;
        this.storage = storage;
        this.sqlite = sqlite;
        this.platform = platform;
        this.file = file;
        this.fileOpener = fileOpener;
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
    stopDiary() {
        const dateNow = Date.now();
        this.sqlite.create({
            name: 'Urinebook.db',
            location: 'default'
        })
            .then((db) => {
            db.executeSql('update [diary] set STOPPED_TIME = ' + dateNow + ' where STOPPED_TIME is null', [])
                .then(() => console.log('Truncate Table Success'))
                .catch(e => console.log(e));
            db.executeSql('SELECT [diary].id, ' +
                '[diary].STOPPED_TIME, ' +
                '[diary].TIME, ' +
                '[diary].AWAKE_SLEEP, ' +
                '[intakes].VOLUME, ' +
                '[intakes].TYPE, ' +
                '[pees].VOLUME as VOLUME_, ' +
                '[pees].URGE, ' +
                '[pees].PAIN, ' +
                '[leaks].DEGREE, ' +
                '[leaks].URGENCY  as URGENCY_,  ' +
                '[leaks].CAUSE  ' +
                'FROM' +
                '[diary] ' +
                'LEFT JOIN [intakes] ' +
                'ON [diary].id = [intakes].[diary] ' +
                'LEFT JOIN [pees] ' +
                'ON [diary].id = [pees].[diary] ' +
                'LEFT JOIN [leaks] ' +
                'ON [diary].id = [leaks].[diary] ', []).then((data) => {
                const rows = [];
                rows.push(['', '', 'Volume', 'Type', 'Volume', 'Urgency', 'Pain', 'Degre', 'Urgency', 'Cause']);
                const columns = ['Time', 'Awake/Asleep', '', 'Intakes', ' ', ' ', 'Pees', ' ', 'Leaks', ' '];
                for (let i = 0; i < data.rows.length; i++) {
                    // rows.push(data.rows.item(i));
                    rows.push([
                        data.rows.item(i).TIME,
                        data.rows.item(i).AWAKE_SLEEP,
                        data.rows.item(i).VOLUME,
                        data.rows.item(i).TYPE,
                        data.rows.item(i).VOLUME_,
                        data.rows.item(i).URGENCY,
                        data.rows.item(i).PAIN,
                        data.rows.item(i).DEGREE,
                        data.rows.item(i).URGENCY_,
                        data.rows.item(i).CAUSE
                    ]);
                }
                console.log('rowS:', rows);
                const doc = new jsPDF('l', 'pt');
                const date = new Date().toDateString();
                // doc.text(this.user.name, 30, 30);
                // doc.text(this.user.surname, 100, 30);
                doc.text('' + date, 300, 30);
                doc.autoTable(columns, rows);
                const pdfOutput = doc.output();
                const buffer = new ArrayBuffer(pdfOutput.length);
                const array = new Uint8Array(buffer);
                for (let i = 0; i < pdfOutput.length; i++) {
                    array[i] = pdfOutput.charCodeAt(i);
                }
                // For this, you have to use ionic native file plugin
                const directory = this.file.cacheDirectory;
                const fileName = 'Report_' + new Date().getTime() + '.pdf';
                if (this.platform.is('android') || this.platform.is('ios')) {
                    this.file.writeFile(directory, fileName, buffer)
                        .then((success) => {
                        console.log('File created succesfully' + JSON.stringify(success));
                        this.file.copyFile(directory, fileName, this.file.dataDirectory, fileName).then(result => {
                            this.fileOpener.open(result.nativeURL, 'application/pdf');
                        });
                    })
                        .catch((error) => console.log('Cannot create File ' + JSON.stringify(error)));
                }
                setTimeout(() => {
                    this.router.navigate(['/voidingDairy']);
                }, 1000);
            });
        });
    }
    ngOnInit() {
    }
};
StartNewEventSecondPageComponent = tslib_1.__decorate([
    Component({
        selector: 'app-start-new-event-second-page',
        templateUrl: './start-new-event-second-page.component.html',
        styleUrls: ['./start-new-event-second-page.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [TranslateService,
        Storage,
        SQLite,
        Platform,
        File,
        FileOpener,
        Router])
], StartNewEventSecondPageComponent);
export { StartNewEventSecondPageComponent };
//# sourceMappingURL=start-new-event-second-page.component.js.map