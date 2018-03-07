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
                    var key = Object.keys(snapshot.val())[0]; // To get the unique key
                    var keywordsRef = this.database.ref(`Keyword/${key}/keywords`);
                    for(var i=0;i<keywords.length;i++){
                        keywordsRef.update({
                            [keywords[i]] : true
                        })
                    }
                }
                else{
                    let ref = dbRef.push();
                    ref.set({
                        userName : obj.email
                    }).then(
                        resolve => {
                            let keywordsRef = ref.child('keywords');
                            for(var i=0;i<keywords.length;i++){
                                keywordsRef.update({
                                    [keywords[i]] : true
                                })
                            }
                        }
                    );
                }
            }
        )
    }
}