import axios from 'axios';
import store from './store/index'

store.getters.config
require('./http-common');

export const globalFunc = {
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
        await axios.get("/user-people").then(result => {
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