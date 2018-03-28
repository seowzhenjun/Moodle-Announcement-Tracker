import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class SetKeywords {

    database : any = firebase.database();
    constructor(){}

    setKeywords(keywords,set? : boolean){
        let dbRef = this.database.ref('Keyword');
        let obj = JSON.parse(window.localStorage.getItem('obj'));
        if(set == null){set=true};
        set = set? true : null;
        dbRef.orderByChild('userName').equalTo(obj.email).once('value').then(
            snapshot => {
                if(snapshot.val() != null){
                    let key = Object.keys(snapshot.val())[0]; // To get the unique key
                    for(var i=0;i<keywords.length;i++){
                        let keywordsRef = this.database.ref(`Keyword/${key}/${keywords[i].from}/keywords`);
                        let emailRef = this.database.ref(`Keyword/${key}/${keywords[i].from}`);
                        emailRef.update({
                            'from' : keywords[i].email
                        });
                        keywordsRef.update({
                            [keywords[i].subject] : set
                        });
                    }
                }
            }
        )
    }

    setImportantMsgId(element,set? : boolean){
        let dbRef = this.database.ref('ImportantMsgId');
        let obj = JSON.parse(window.localStorage.getItem('obj'));
        if(set == null){set = true;}
        set = set? true : null;
        dbRef.orderByChild('userName').equalTo(obj.email).once('value').then(
            snapshot => {
                if(snapshot.val() != null){
                    let key = Object.keys(snapshot.val())[0]; // To get the unique key
                    for(var i=0;i<element.length;i++){
                        let keywordsRef = this.database.ref(`ImportantMsgId/${key}/id`);
                        keywordsRef.update({
                            [element[i].id] : set
                        })
                    }
                }
            }
        )
    }

    setupDb(){
        let keywordRef = this.database.ref('Keyword');
        let importantMsgIdRef = this.database.ref('ImportantMsgId');
        let obj = JSON.parse(window.localStorage.getItem('obj'));

        keywordRef.orderByChild('userName').equalTo(obj.email).once('value').then(
            snapshot => {
                if(snapshot.val()==null){
                    keywordRef.push().set({
                        userName : obj.email
                    });
                }
            }
        );

        importantMsgIdRef.orderByChild('userName').equalTo(obj.email).once('value').then(
            snapshot => {
                if(snapshot.val()==null){
                    importantMsgIdRef.push().set({
                        userName : obj.email
                    });
                }
            }
        );
    }
}