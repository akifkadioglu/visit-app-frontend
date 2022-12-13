const AES = require('crypto-js/aes');
var CryptoJS = require("crypto-js");
import axios from 'axios';
import store from './store/index'

store.getters.config
require('./http-common');
const base64url = require("base64url");

export const httpRequests = {
    async getPeople() {
        await axios
            .get("/people")
            .then((result) => {
                store.state.people = result.data.people;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    async getUserPeople() {
        await axios.get("/user-people")
            .then(result => {
                store.state.userPeople = result.data.people;
            }).catch(err => {
                console.log(err)
            })

    },
    async getSectors() {
        await axios
            .get("/sectors")
            .then((result) => {
                store.state.sectors = result.data.sectors;
            })
            .catch((err) => {
                console.log(err);
            });

    },
    async getPersonnels() {
        await axios
            .get("/personnels")
            .then((result) => {
                store.state.personnels = result.data.personnels;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    async dailyVisits() {
        await axios
            .get("/daily-user-visits")
            .then((result) => {
                store.state.dailyVisits = result.data.visits;
            })
            .catch((err) => {
                console.log(err);
            });

    },
    async getAllVisits() {
        await axios
            .get("/visits")
            .then((result) => {
                store.state.AllVisits = result.data.visits;
            })
            .catch((err) => {
                console.log(err);
            });

    },
    async getPersonnelVisits() {
        await axios
            .get("/personnel-visits")
            .then((result) => {
                store.state.personnelVisits = result.data.visits;
            })
            .catch((err) => {
                console.log(err);
            });
    },


    getRoles() {
        store.state.roles = [
            {
                Name: "Ihvan",
                Role: true,
            },
            {
                Name: "Esnaf",
                Role: false,
            },
        ];
    },
}
export const helpers = {
    parseJwt(token) {
        try {
            return JSON.parse(base64url.decode(token.split(".")[1]));
        } catch (e) {
            return null;
        }
    },
    returnDecryptedLocalStorage(key) {
        var isEmpty = localStorage.getItem(key) == null
        return !isEmpty ? AES.decrypt(
            localStorage.getItem(key),
            process.env.VUE_APP_APP_KEY
        ).toString(CryptoJS.enc.Utf8) : !isEmpty
    },
    returnEncryptItem(key) {
        var encrypt = AES.encrypt(
            key.toString(),
            process.env.VUE_APP_APP_KEY
        ).toString()
        return encrypt

    },
    returnDecryptItem(key) {
        var decrypt = AES.decrypt(
            key,
            process.env.VUE_APP_APP_KEY
        ).toString(CryptoJS.enc.Utf8)
        return decrypt
    },

}