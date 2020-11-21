"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
var app_1 = __importDefault(require("firebase/app"));
require("firebase/auth");
var Auth = /** @class */ (function () {
    function Auth(config) {
        this.app = app_1.default.initializeApp(config);
        this.auth = app_1.default.auth();
    }
    Auth.prototype.login = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.auth
                .signInWithEmailAndPassword(email, password)
                .then(function () { return resolve(_this.auth.currentUser); })
                .catch(function (error) { return reject(error.message); });
        });
    };
    Auth.prototype.googleLogin = function () {
        var _this = this;
        var provider = new app_1.default.auth.GoogleAuthProvider();
        provider.addScope("profile");
        provider.addScope("email");
        return new Promise(function (resolve, reject) {
            _this.auth.signInWithPopup(provider)
                .then(function (resp) { return resolve(resp.user); })
                .catch(function (error) { return reject(error.message); });
        });
    };
    Auth.prototype.signUp = function (email, password, passwordConfirm) {
        var _this = this;
        if (email && password === passwordConfirm) {
            return new Promise(function (resolve, reject) {
                _this.auth
                    .createUserWithEmailAndPassword(email, password)
                    .then(function () {
                    /*
                    Sends verification email using firebase
                    if sign up is successful
                    */
                    _this.auth.currentUser.sendEmailVerification();
                    resolve(_this.auth.currentUser);
                })
                    .catch(function (error) { return reject(error.message); });
            });
        }
        else {
            throw new Error("Passwords do not match");
        }
    };
    Auth.prototype.signOut = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.auth.signOut()
                .then(function () {
                // Sign-out successful
                resolve({
                    success: true
                });
            })
                .catch(function (error) { return reject(error.message); });
        });
    };
    Auth.prototype.getCurrentUser = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.auth.onAuthStateChanged(function (currentUser) {
                if (currentUser) {
                    //  If user is logged in firebase returns current user data
                    resolve(currentUser);
                }
                else {
                    // If no user is signed in currentUser is null
                    reject(new Error("No user logged in"));
                }
            });
        });
    };
    return Auth;
}());
exports.Auth = Auth;
