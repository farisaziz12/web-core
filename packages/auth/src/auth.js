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
                .then(function () {
                return _this.app.auth().onAuthStateChanged(function (user) {
                    resolve(user);
                });
            })
                .catch(function (error) { return reject(error); });
        });
    };
    return Auth;
}());
exports.Auth = Auth;
