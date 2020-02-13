import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Storage } from '@ionic/storage';


@Injectable()
export class Data {

    path = null;
    iciqsfData = null;
    ipssData = null;
    oabData = null;
    data = null;
    items = [];
    user = {
        name: '',
        surname: '',
        id: ''
    };

    constructor(private http: Http,
                private sqlite: SQLite,
                private storage: Storage
    ) {
        this.initStorage();
    }

    initStorage() {
        this.storage.ready().then(() => {
            this.storage.get('lang').then((lang) => {
                if (lang) {
                    this.path = 'assets/questionareDatas/' + lang;
                } else {
                    this.path = 'assets/questionareDatas/it';
                }
            });
        });
    }

    loadICIFSFquestions() {
        return new Promise(resolve => {
            this.http.get(this.path + '/ICIQ-SFquestions.json').
                pipe(map(
                    (response) => response.json()
                )).
                subscribe(
                    (data) => {
                        {
                            this.iciqsfData = data.questions;
                            resolve(this.iciqsfData);
                        }
                    }
                );
        });
    }

    loadIPSSquestions() {
        return new Promise(resolve => {
            this.http.get(this.path + '/IPSSquestions.json').
                pipe(map(
                    (response) => response.json()
                )).
                subscribe(
                    (data) => {
                        {
                            this.ipssData = data.questions;
                            resolve(this.ipssData);
                        }
                    }
                );
        });
    }

    loadOABquestions() {
        return new Promise(resolve => {
            this.http.get(this.path + '/OABquestions.json').
                pipe(map(
                    (response) => response.json()
                )).
                subscribe(
                    (data) => {
                        {
                            this.oabData = data.questions;
                            resolve(this.oabData);
                        }
                    }
                );
        });
    }

    loadLitwinquestions() {
        return new Promise(resolve => {
            this.http.get(this.path + '/Litwinquestions.json').
                pipe(map(
                    (response) => response.json()
                )).
                subscribe(
                    (data) => {
                        {
                            this.data = data.questions;
                            resolve(this.data);
                        }
                    }
                );
        });
    }


    getName() {

        return new Promise(resolve => {
            this.sqlite.create({
                name: 'ubook.db',
                location: 'default'
            })
                .then((db: SQLiteObject) => {
                    db.executeSql('select id,firstName, lastName from userstable', []).then((data) => {
                        if (data.rows.length > 0) {
                            this.user.name = data.rows.item(0).firstName;
                            this.user.surname = data.rows.item(0).lastName;
                            this.user.id = data.rows.item(0).id;
                            resolve(this.user);
                        } else {
                            resolve(this.user);
                        }
                    });
                });
        });
    }
}
