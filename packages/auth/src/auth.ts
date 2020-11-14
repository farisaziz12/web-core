import firebase from "firebase/app";
import "firebase/auth";

export class Auth {
    app: any;
    auth: any;

    constructor(config: object) {
        this.app = firebase.initializeApp(config);
        this.auth = firebase.auth();
    }

    login(email: string, password: string) {
        return new Promise((resolve: any, reject: any) => {
            this.auth
                .signInWithEmailAndPassword(email, password)
                .then(() =>
                    this.app.auth().onAuthStateChanged((user: any) => {
                        resolve(user)
                    })
                )
                .catch((error: any) => reject(error));
        });
    }
}


