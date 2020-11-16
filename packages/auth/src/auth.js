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
                .then(() => this.app.auth().onAuthStateChanged((user) => {
                resolve(user);
            }))
                .catch((error) => reject(error));
        });
    }
}
exports.Auth = Auth;
