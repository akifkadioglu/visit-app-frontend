import router from '../router'
import { helpers } from '../globalFunc';
export const middlewares = {
    login(to, from, next) {
        if (
            localStorage.getItem("token") != null
        ) {
            router.push({ name: "Home" });
        }
        next()
    },
    auth(to, from, next) {
        if (
            localStorage.getItem("token") == null ||
            localStorage.getItem("token") == ""
        ) {
            router.push({ name: "Login" });
        }
        next()
    },
    admin(to, from, next) {
        if (helpers.returnDecryptedLocalStorage("role") === "true") {
            next()
        } else {
            router.push({ name: "Home" });
        }
    }
}