import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { DecimalPipe } from '@angular/common';


declare var jsPDF: any;
@Component({
  selector: 'app-your-profile',
  templateUrl: './your-profile.component.html',
  styleUrls: ['./your-profile.component.scss'],
})
export class YourProfileComponent implements OnInit {
  lang: any;
  form: FormGroup;
  db: SQLiteObject;
  inputHeight: any;
  inputWeight: any;
  calculatedAge: any;
  calculatedBmi: any;
  private todo: FormGroup;

  public errormessage = {
    firstName: [
      { type: 'required', mesage: '*Name is required' },
      { type: 'maxlength', mesage: '*Name can not be longer  then 100 characters' }
    ],
    lastName: [
      { type: 'required', mesage: '*Last Name is required' },
      { type: 'maxlength', mesage: '*Last Name can not be longer  then 100 characters' }
    ],
    birthDate: [
      { type: 'required', mesage: '*Birth Date is required' },
      { type: 'maxlength', mesage: '*Birth Date can not be longer  then 100 characters' }
    ],
    medicalTherapy: [
      { type: 'required', mesage: '*Medical Therapy is required and can not be shorter then 20 characters' },
      { type: 'minlength', medicalTherapy: '*Name can not be shorter then 20 characters' }
    ]
  };

  constructor(
    private fb: FormBuilder,
    public sqlite: SQLite,
    public translate: TranslateService,
    private storage: Storage,
    public toastCtrl: ToastController,
    private decimalPipe: DecimalPipe,
    private formBuilder: FormBuilder
  ) {
    // Language settings
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

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      height: [''],
      weight: [''],
      bmi: [{ value: '', disabled: true }],
      age: [{ value: '', disabled: true }],
      gender: [0, Validators.required],
      medicalTherapy: [''],
    });

    this.initDB();
  }

  async successToast() {
    let alertTitle = '';
    this.translate.get('successToast').subscribe(
      value => {
        alertTitle = value;
      }
    );

    const toast = await this.toastCtrl.create({
      message: alertTitle,
      animated: true,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  async errorToast() {
    let alertTitle: string;
    this.translate.get('errorToast').subscribe(
      value => {
        alertTitle = value;
      }
    );
    const toast = await this.toastCtrl.create({
      message: alertTitle,
      animated: true,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  save() {
    if (!this.form.valid) {
      console.log('not valid');
    }
    this.sqlite.create({
      name: 'ubook.db',
      location: 'default'
    })
      .then((db) => {
        const newDate = new Date(this.form.value.birthDate);
        const birthDate = newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear();

        const timeDiff = Math.abs(Date.now() - new Date(birthDate).getTime());
        const age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
        
        let BMI;
        if(this.form.value.weight && this.form.value.height !== null || this.form.value.weight && this.form.value.height !== ''){
        this.calculatedBmi = this.form.value.weight / ((this.form.value.height / 100) * (this.form.value.height / 100));
        BMI = this.decimalPipe.transform(this.calculatedBmi, '1.2-2')
        }else{
          BMI = '';
        }

        db.executeSql('CREATE TABLE IF NOT EXISTS [userstable]' +
          '(id INTEGER PRIMARY KEY AUTOINCREMENT,' +
          'firstName text NOT NULL,' +
          'lastName text NOT NULL,' +
          'birthDate text NOT NULL,' +
          'age text NOT NULL,' +
          'height text NOT NULL,' +
          'weight text NOT NULL,' +
          'gender text NOT NULL,' +
          'bmi text NOT NULL,' +
          'medicalTherapy text NOT NULL)', []);

        db.executeSql('INSERT OR REPLACE INTO  [userstable]' +
          '(id, firstName,lastName,birthDate,age,height,weight,gender,bmi,medicalTherapy)' +
          'VALUES' +
          '(1,' +
          '"' + this.form.value.firstName + '",' +
          '"' + this.form.value.lastName + '",' +
          '"' + birthDate + '",' +
          '"' + age + '",' +
          '"' + this.form.value.height + '",' +
          '"' + this.form.value.weight + '",' +
          '"' + this.form.value.gender + '",' +
          '"' + BMI + '",' +
          '"' + this.form.value.medicalTherapy + '")', [])
          .then(() => {
            //this.successToast();
            this.initDB();
          })
          .catch(e => {
            console.log('error: ', e);
            //this.errorToast();
          });
      });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  // ========== Validation of Profile form ============
  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get birthDate() {
    return this.form.get('birthDate');
  }
  get age() {
    return this.form.get('age');
  }
  get height() {
    return this.form.get('height');
  }
  get weight() {
    return this.form.get('weight');
  }
  get gender() {
    return this.form.get('gender');
  }
  get medicalTherapy() {
    return this.form.get('medicalTherapy');
  }

  ngOnInit() {
  }

  initDB() {
    this.sqlite.create({
      name: 'ubook.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('select * from userstable', []).then((data) => {
          console.log('rows: ', data.rows);
          if (data.rows.length > 0) {
            this.form = this.formBuilder.group({
              firstName: [data.rows.item(0).firstName, Validators.required],
              lastName: [data.rows.item(0).lastName, Validators.required],
              birthDate: [data.rows.item(0).birthDate, Validators.required],
              age: [{ value: data.rows.item(0).age, disabled: true }],
              height: [data.rows.item(0).height],
              weight: [data.rows.item(0).weight],
              gender: [data.rows.item(0).gender, Validators.required],
              bmi: [{ value: data.rows.item(0).bmi, disabled: true }],
              medicalTherapy: [data.rows.item(0).medicalTherapy],
            });
          }
        }, (err) => {
          console.log('error: ', err);
          // alert('Unable to execute sql: ' + JSON.stringify(err));
        });
      })
      .catch(e => {
        alert(JSON.stringify(e));
      });
  }

  Getage() {
    const newDate = new Date(this.form.value.birthDate);
    const birthDate = newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear();

    const timeDiff = Math.abs(Date.now() - new Date(birthDate).getTime());
    const age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    this.form.controls['age'].setValue(age);
  }

  changedBMI(){
    this.calculatedBmi = this.form.value.weight / ((this.form.value.height / 100) * (this.form.value.height / 100));
    this.form.controls['bmi'].setValue(this.calculatedBmi);
  }

}
