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
                .then(() => resolve(this.auth.currentUser))
                .catch((error: any) => reject(error.message));
        });
    }

    signUp(email: string, password: string, passwordConfirm: string) {
        if (email && password === passwordConfirm){
            return new Promise((resolve: any, reject: any) => {
                this.auth
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    /*
                    Sends verification email using firebase
                    if sign up is successful
                    */
                    this.auth.currentUser.sendEmailVerification()
                    resolve(this.auth.currentUser)
                })
                .catch((error: any) => reject(error.message));
            })
        } else {
            throw new Error("Passwords do not match")
        }
    }

    signOut() {
        return new Promise((resolve: any, reject: any) => {
            this.auth.signOut()
            .then(() => {
                // Sign-out successful
                resolve({
                    success: true
                })
            })
            .catch((error: any) => reject(error.message))
        })
    }

    getCurrentUser() {
        return new Promise((resolve: any, reject: any) => {
            this.auth.onAuthStateChanged((currentUser: object) => {
                if (currentUser){
                    //  If user is logged in firebase returns current user data
                    resolve(currentUser)
                } else {
                    // If no user is signed in currentUser is null
                    reject(new Error("No user logged in"))
                }
            })
        })
    }
}
