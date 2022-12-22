import axios from 'axios';

const AES = require('crypto-js/aes');
var CryptoJS = require("crypto-js");

var token = (localStorage.getItem('token') ?? '').toString();
if (token != '') {
    try {
        token = AES.decrypt(
            localStorage.getItem("token"),
            process.env.VUE_APP_APP_KEY,
        ).toString(CryptoJS.enc.Utf8);

        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    } catch (error) {
        localStorage.clear()
    }
}
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
