import requester from "../lib/requester";

export const userEndpoints = {
    signIn: function (userName, password) {
        const path = "/users/signin";
        const data = {
            userName: userName,
            password: password,
        }

        return requester.post(path, data);
    },

    signUp: function (userName, password) {
        const path = "/users/signup";
        const data = {
            userName: userName,
            password: password,
        }

        return requester.post(path, data);
    }
}