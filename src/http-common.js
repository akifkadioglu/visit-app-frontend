import axios from 'axios';
const AES = require('crypto-js/aes');
var CryptoJS = require("crypto-js");

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
var token = (localStorage.getItem('token') ?? '').toString();
if (token != '') {
    token = AES.decrypt(
        localStorage.getItem("token"),
        process.env.VUE_APP_APP_KEY,
    ).toString(CryptoJS.enc.Utf8);

    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
}
axios.defaults.baseURL = "http://127.0.0.1:9000/";
