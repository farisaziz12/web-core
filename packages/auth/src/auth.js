"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const app_1 = __importDefault(require("firebase/app"));
require("firebase/auth");
class Auth {
    constructor(config) {
        this.app = app_1.default.initializeApp(config);
        this.auth = app_1.default.auth();
    }
    login(email, password) {
        return new Promise((resolve, reject) => {
            this.auth
                .signInWithEmailAndPassword(email, password)
                .then(() => resolve(this.auth.currentUser))
                .catch((error) => reject(error.message));
        });
    }
    signUp(email, password, passwordConfirm) {
        if (email && password === passwordConfirm) {
            return new Promise((resolve, reject) => {
                this.auth
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => {
                    /*
                    Sends verification email using firebase
                    if sign up is successful
                    */
                    this.auth.currentUser.sendEmailVerification();
                    resolve(this.auth.currentUser);
                })
                    .catch((error) => reject(error.message));
            });
        }
        else {
            throw new Error("Passwords do not match");
        }
    }
}
exports.Auth = Auth;
