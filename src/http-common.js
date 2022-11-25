import axios from 'axios';
var token
if (localStorage.getItem("token") != null) {
    token = localStorage.getItem("token")
}
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Authorization'] = `Bearer ` + token
axios.defaults.baseURL = "http://127.0.0.1:9000/";
