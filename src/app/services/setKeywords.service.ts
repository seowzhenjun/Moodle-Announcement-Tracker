import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class SetKeywords {

    database : any = firebase.database();
    constructor(){}

    setKeywords(keywords){
        let dbRef = this.database.ref('Keyword');
        let obj = JSON.parse(window.localStorage.getItem('obj'));

        dbRef.orderByChild('userName').equalTo(obj.email).once('value').then(
            snapshot => {
                if(snapshot.val() != null){
                    let key = Object.keys(snapshot.val())[0]; // To get the unique key
                    for(var i=0;i<keywords.length;i++){
                        console.log(keywords[i].email);
                        let keywordsRef = this.database.ref(`Keyword/${key}/${keywords[i].from}`);
                        keywordsRef.update({
                            [keywords[i].subject] : true,
                            'from' : keywords[i].email
                        })
                    }
                }
                else{
                    let ref = dbRef.push();
                    ref.set({
                        userName : obj.email
                    }).then(
                        resolve => {
                            for(var i=0;i<keywords.length;i++){
                                let keywordsRef = ref.child(`${keywords[i].from}`);
                                keywordsRef.update({
                                    [keywords[i].subject] : true,
                                    'from' : keywords[i].email
                                })
                            }
                        }
                    );
                }

                
            }
        )
    }

    setImportantMsgId(element){
        let dbRef = this.database.ref('ImportantMsgId');
        let obj = JSON.parse(window.localStorage.getItem('obj'));

        dbRef.orderByChild('userName').equalTo(obj.email).once('value').then(
            snapshot => {
                if(snapshot.val() != null){
                    let key = Object.keys(snapshot.val())[0]; // To get the unique key
                    for(var i=0;i<element.length;i++){
                        let keywordsRef = this.database.ref(`ImportantMsgId/${key}/id`);
                        keywordsRef.update({
                            [element[i].id] : true
                        })
                    }
                }
                else{
                    let ref = dbRef.push();
                    ref.set({
                        userName : obj.email
                    }).then(
                        resolve =>{
                            for(var i=0;i<element.length;i++){
                                let keywordsRef = ref.child(`id`);
                                keywordsRef.update({
                                    [element[i].id] : true
                                })
                            }
                        }
                    )
                }
            }
        )
    }
}