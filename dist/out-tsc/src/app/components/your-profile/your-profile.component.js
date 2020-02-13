import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { DecimalPipe } from '@angular/common';
let YourProfileComponent = class YourProfileComponent {
    constructor(fb, sqlite, translate, storage, toastCtrl, decimalPipe, formBuilder) {
        this.fb = fb;
        this.sqlite = sqlite;
        this.translate = translate;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.decimalPipe = decimalPipe;
        this.formBuilder = formBuilder;
        this.errormessage = {
            firstName: [
                { type: 'required', mesage: '*Name is required' },
                { type: 'maxlength', mesage: '*Name can not be longer  then 100 characters' }
            ],
            lastName: [
                { type: 'required', mesage: '*Last Name is required' },
                { type: 'maxlength', mesage: '*Last Name can not be longer  then 100 characters' }
            ],
            birthDate: [
                { type: 'required', mesage: '*Last Name is required' },
                { type: 'maxlength', mesage: '*Last Name can not be longer  then 100 characters' }
            ],
            height: [
                { type: 'required', mesage: '*Height is required' }
            ],
            weight: [
                { type: 'required', mesage: '*Weight is required' }
            ],
            medicalTherapy: [
                { type: 'required', mesage: '*Medical Therapy is required and can not be shorter then 20 characters' },
                { type: 'minlength', medicalTherapy: '*Name can not be shorter then 20 characters' }
            ]
        };
        // Language settings
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
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            birthDate: ['', Validators.required],
            height: ['', Validators.required],
            weight: ['', Validators.required],
            bmi: [{ value: '', disabled: true }],
            age: [{ value: '', disabled: true }],
            gender: [0, Validators.required],
            medicalTherapy: [''],
        });
        this.initDB();
    }
    successToast() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let alertTitle = '';
            this.translate.get('successToast').subscribe(value => {
                alertTitle = value;
            });
            const toast = yield this.toastCtrl.create({
                message: alertTitle,
                animated: true,
                duration: 2000,
                color: 'success'
            });
            toast.present();
        });
    }
    errorToast() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let alertTitle;
            this.translate.get('errorToast').subscribe(value => {
                alertTitle = value;
            });
            const toast = yield this.toastCtrl.create({
                message: alertTitle,
                animated: true,
                duration: 2000,
                color: 'danger'
            });
            toast.present();
        });
    }
    save() {
        if (!this.form.valid) {
            console.log('not valid');
        }
        this.sqlite.create({
            name: 'Urinebook.db',
            location: 'default'
        })
            .then((db) => {
            const newDate = new Date(this.form.value.birthDate);
            const birthDate = newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear();
            const timeDiff = Math.abs(Date.now() - new Date(birthDate).getTime());
            const age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
            this.calculatedBmi = this.form.value.weight / ((this.form.value.height / 100) * (this.form.value.height / 100));
            console.log('birth date: ', this.form.value);
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
            db.executeSql('INSERT OR REPLACE INTO  [userstable]' +
                '(id, firstName,lastName,birthDate,age,height,weight,gender,bmi,medicalTherapy)' +
                'VALUES' +
                '(1,' +
                '"' + this.form.value.firstName + '",' +
                '"' + this.form.value.lastName + '",' +
                '"' + birthDate + '",' +
                '"' + age + '",' +
                '' + this.form.value.height + ',' +
                '' + this.form.value.weight + ',' +
                '"' + this.form.value.gender + '",' +
                '"' + this.decimalPipe.transform(this.calculatedBmi, '1.2-2') + '",' +
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
        // .catch(e => alert(JSON.stringify(e)));
        // alert([]);
    }
    onSubmit() {
        console.log(this.form.value);
    }
    // ========== Validation of Profile form ========================================================
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
        //     this.sqlite.create({
        //   name: 'Urinebook.db',
        //   location: 'default'
        // })
        //   .then((db) => {
        //     console.log('succes');
        //     db.executeSql('drop table userstable', []).then((data) => {
        //         alert("test 1   " + JSON.stringify(data.rows.item(1)));
        //         console.log("ggggggggggggg");
        //       })
        //   });
    }
    initDB() {
        this.sqlite.create({
            name: 'Urinebook.db',
            location: 'default'
        })
            .then((db) => {
            db.executeSql('select * from userstable', []).then((data) => {
                console.log('rows: ', data.rows);
                if (data.rows.length > 0) {
                    this.form = this.formBuilder.group({
                        firstName: [data.rows.item(0).firstName, Validators.required],
                        lastName: [data.rows.item(0).lastName, Validators.required],
                        birthDate: [data.rows.item(0).birthDate, Validators.required],
                        age: [{ value: data.rows.item(0).age, disabled: true }],
                        height: [data.rows.item(0).height, Validators.required],
                        weight: [data.rows.item(0).weight, Validators.required],
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
    // onHeightChange(height) {
    //   this.inputHeight = height;
    //   if (this.inputHeight && this.inputWeight) {
    //     this.calculatedBmi = this.inputWeight / ((this.inputHeight / 100) * (this.inputHeight / 100));
    //     this.form = this.formBuilder.group({
    //       firstName: [this.form.value.firstName, Validators.required],
    //       lastName: [this.form.value.lastName, Validators.required],
    //       birthDate: [this.form.value.birthDate, Validators.required],
    //       height: [this.form.value.height, Validators.required],
    //       weight: [this.form.value.weight, Validators.required],
    //       bmi: [{value: this.decimalPipe.transform(this.calculatedBmi, '1.2-2'), disabled: true}],
    //       age: [{ value: this.form.value.age, disabled: true }],
    //       gender: [this.form.value.age, Validators.required],
    //       medicalTherapy: [this.form.value.medicalTherapy],
    //     });
    //   }
    // }
    // onWeightChange(weight) {
    //   this.inputWeight = weight;
    //   if (this.inputHeight && this.inputWeight) {
    //     this.calculatedBmi = this.inputWeight / ((this.inputHeight / 100) * (this.inputHeight / 100));
    //     this.form = this.formBuilder.group({
    //       firstName: [this.form.value.firstName, Validators.required],
    //       lastName: [this.form.value.lastName, Validators.required],
    //       birthDate: [this.form.value.birthDate, Validators.required],
    //       height: [this.form.value.height, Validators.required],
    //       weight: [this.form.value.weight, Validators.required],
    //       bmi: [{value: this.decimalPipe.transform(this.calculatedBmi, '1.2-2'), disabled: true}],
    //       age: [{ value: this.form.value.age, disabled: true }],
    //       gender: [this.form.value.age, Validators.required],
    //       medicalTherapy: [this.form.value.medicalTherapy],
    //     });
    //   }
    // }
    // onBirthDateChange(birthDateInput) {
    //   console.log('birthdateinput: ', birthDateInput);
    //   if (birthDateInput) {
    //     const timeDiff = Math.abs(Date.now() - new Date(birthDateInput).getTime());
    //     const age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    //     this.form = this.formBuilder.group({
    //       firstName: [this.form.value.firstName, Validators.required],
    //       lastName: [this.form.value.lastName, Validators.required],
    //       birthDate: [this.form.value.birthDate, Validators.required],
    //       height: [this.form.value.height, Validators.required],
    //       weight: [this.form.value.weight, Validators.required],
    //       bmi: [{ value: this.form.value.bmi, disabled: true }],
    //       age: [{ value: age, disabled: true }],
    //       gender: [this.form.value.age, Validators.required],
    //       medicalTherapy: [this.form.value.medicalTherapy],
    //     });
    //   }
    // }
    // this.sqlite.create({
    //   name: 'Urinebook.db',
    //   location: 'default'
    // })
    //   .then((db) => {
    //     console.log('succes');
    //     db.executeSql('drop table  pees', []).then((data) => {
    //         alert("test 1   " + JSON.stringify(data.rows.item(1)));
    //         console.log("ggggggggggggg");
    //       })
    //   });
    Getage() {
        const newDate = new Date(this.form.value.birthDate);
        const birthDate = newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear();
        const timeDiff = Math.abs(Date.now() - new Date(birthDate).getTime());
        const age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
        this.form.controls['firstName'].setValue('hey');
    }
};
YourProfileComponent = tslib_1.__decorate([
    Component({
        selector: 'app-your-profile',
        templateUrl: './your-profile.component.html',
        styleUrls: ['./your-profile.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        SQLite,
        TranslateService,
        Storage,
        ToastController,
        DecimalPipe,
        FormBuilder])
], YourProfileComponent);
export { YourProfileComponent };
//# sourceMappingURL=your-profile.component.js.map