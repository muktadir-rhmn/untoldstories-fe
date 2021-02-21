import {requester} from "../lib/requester";

export const userAPI = {
    signIn: (userName, password) => {
        const path = "/users/signin";
        const data = {
            userName: userName,
            password: password,
        }

        return requester.post(path, data);
    },

    signUp: (userName, password) => {
        const path = "/users/signup";
        const data = {
            userName: userName,
            password: password,
        }

        return requester.post(path, data);
    },

    fetchUserData: (userID) => {
        const path = `/users/${userID}`;

        return requester.get(path);
    }
}
