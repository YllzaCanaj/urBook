import { IonSlides, Platform } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Data } from '../../../providers/data';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Router } from '@angular/router';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';

declare var jsPDF;
@Component({
  selector: 'app-iciq-sf',
  templateUrl: './iciq-sf.component.html',
  styleUrls: ['./iciq-sf.component.scss'],
})

export class IciqSfComponent implements OnInit {

  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  hasAnswered = false;
  slideOptions: any;
  questions: any;
  reachedEnd = false;
  reachedStart = true;
  lang: any;
  jsPDF: any;
  user: any;

  constructor(
    public dataService: Data,
    private sqlite: SQLite,
    private platform: Platform,
    private file: File,
    private fileOpener: FileOpener,
    public translate: TranslateService,
    private storage: Storage,
    private router: Router,
    private document: DocumentViewer) {

    this.storage.ready().then(() => {
      this.storage.get('lang').then((lang) => {
        if (lang) {
          this.lang = lang;
        } else {
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
    this.dataService.loadICIFSFquestions().then((data) => {
      this.questions = data;

      for (const question of this.questions) {
        for (const answer of question.answers) {
          answer.selected = false;
        }
      }

    });

    this.reachedEnd = false;
    this.reachedStart = true;

    setTimeout(() => {
      this.slides.lockSwipes(true);
    }, 1000);

  }

  downloadPDF() {
    let questionsCol, answerCol, totalResult;
    this.translate.get('questions').subscribe(
      value => {
        questionsCol = value;
      }
    );
    this.translate.get('answers').subscribe(
      value => {
        answerCol = value;
      }
    );
    this.translate.get('totalResult').subscribe(
      value => {
        totalResult = value;
      }
    );
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
    doc.autoTable(columns, rows, {columnStyles: {
      0: {columnWidth: 'auto'},
      1: {columnWidth: 80}
    }});

    const pdfOutput = doc.output();
    const buffer = new ArrayBuffer(pdfOutput.length);
    const array = new Uint8Array(buffer);
    for (let i = 0; i < pdfOutput.length; i++) {
      array[i] = pdfOutput.charCodeAt(i);
    }

    // For this, you have to use ionic native file plugin
    const directory = this.file.cacheDirectory;
    const fileName = 'ICIQ-SF_' + new Date().getTime() + '.pdf';

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

}

