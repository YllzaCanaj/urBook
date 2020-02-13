import * as tslib_1 from "tslib";
import { IonSlides } from '@ionic/angular';
import { Component, ViewChild } from '@angular/core';
import { Data } from '../../../../providers/data';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';
let OabComponent = class OabComponent {
    constructor(dataService, translate, platform, file, sqlite, router, fileOpener, storage) {
        this.dataService = dataService;
        this.translate = translate;
        this.platform = platform;
        this.file = file;
        this.sqlite = sqlite;
        this.router = router;
        this.fileOpener = fileOpener;
        this.storage = storage;
        this.hasAnswered = false;
        this.reachedEnd = false;
        this.reachedStart = true;
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
        this.dataService.getName().then((user) => {
            this.user = user;
        });
    }
    nextSlide() {
        this.hasAnswered = false;
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
        this.reachedStart = false;
    }
    previousSlide() {
        this.hasAnswered = true;
        this.slides.lockSwipes(false);
        this.slides.slidePrev();
        this.slides.lockSwipes(true);
        this.reachedEnd = false;
    }
    selectAnswer(answer) {
        this.hasAnswered = true;
        answer.selected = true;
    }
    ngOnInit() {
        this.dataService.loadOABquestions().then((data) => {
            this.questions = data;
            for (const question of this.questions) {
                for (const answer of question.answers) {
                    answer.selected = false;
                }
            }
            this.reachedEnd = false;
            this.reachedStart = true;
        });
        setTimeout(() => {
            this.slides.lockSwipes(true);
        }, 1000);
    }
    downloadPDF() {
        let questionsCol, answerCol, totalResult;
        this.translate.get('questions').subscribe(value => {
            questionsCol = value;
        });
        this.translate.get('answers').subscribe(value => {
            answerCol = value;
        });
        this.translate.get('totalResult').subscribe(value => {
            totalResult = value;
        });
        const columns = [questionsCol, answerCol];
        const rows = [];
        let totalRes = 0;
        let achievedRes = 0;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.questions.length; i++) {
            totalRes += this.questions[i].answers.length - 1;
            for (let j = 0; j < this.questions[i].answers.length; j++) {
                if (this.questions[i].answers[j].selected === true) {
                    achievedRes += j;
                    rows.push([
                        this.questions[i].questionText,
                        j
                    ]);
                }
            }
        }
        const res = achievedRes + ' / ' + totalRes;
        rows.push([totalResult, res]);
        const doc = new jsPDF('p', 'pt');
        const date = new Date().toDateString();
        doc.text(this.user.name, 30, 30);
        doc.text(this.user.surname, 100, 30);
        doc.text('' + date, 300, 30);
        doc.autoTable(columns, rows, { columnStyles: {
                0: { columnWidth: 'auto' },
                1: { columnWidth: 80 }
            } });
        const pdfOutput = doc.output();
        const buffer = new ArrayBuffer(pdfOutput.length);
        const array = new Uint8Array(buffer);
        for (let i = 0; i < pdfOutput.length; i++) {
            array[i] = pdfOutput.charCodeAt(i);
        }
        // For this, you have to use ionic native file plugin
        const directory = this.file.cacheDirectory;
        const fileName = 'OAB_' + new Date().getTime() + '.pdf';
        if (this.platform.is('android') || this.platform.is('ios')) {
            this.file.writeFile(directory, fileName, buffer)
                .then((success) => {
                console.log('File created succesfully' + JSON.stringify(success));
                this.file.copyFile(directory, fileName, this.file.dataDirectory, fileName).then(result => {
                    this.fileOpener.open(result.nativeURL, 'application/pdf');
                });
            })
                .catch((error) => console.log('Cannot Create File ' + JSON.stringify(error)));
        }
        setTimeout(() => {
            this.router.navigate(['/selfEvaluation']);
        }, 1000);
    }
    slidesReachedEnd(event) {
        this.slides.getActiveIndex().then(index => {
            console.log('index: ', index);
            if (index !== 0) {
                this.reachedEnd = true;
            }
        });
    }
    slidesReachedStart(event) {
        this.reachedStart = true;
    }
};
tslib_1.__decorate([
    ViewChild(IonSlides, { static: false }),
    tslib_1.__metadata("design:type", IonSlides)
], OabComponent.prototype, "slides", void 0);
OabComponent = tslib_1.__decorate([
    Component({
        selector: 'app-oab',
        templateUrl: './oab.component.html',
        styleUrls: ['./oab.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [Data,
        TranslateService,
        Platform,
        File,
        SQLite,
        Router,
        FileOpener,
        Storage])
], OabComponent);
export { OabComponent };
//# sourceMappingURL=oab.component.js.map