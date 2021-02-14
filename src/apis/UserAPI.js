import requester from "../lib/requester";

const userAPI = {
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

export default userAPI;