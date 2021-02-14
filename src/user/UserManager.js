class UserManager {
    constructor() {
        this._isSignedIn = null;
    }

    getToken() {
        return localStorage.getItem(this._getTokenKey());
    }

    addSignInInfo(userID, token) {
        localStorage.setItem(this._getUserIDKey(), userID);
        localStorage.setItem(this._getTokenKey(), token);

        this._isSignedIn = userID != null;
    }

    removeSignInInfo() {
        this._isSignedIn = false;

        localStorage.removeItem(this._getUserIDKey());
        localStorage.removeItem(this._getTokenKey());
    }

    isSignedIn() {
        if (this._isSignedIn === null) {
            this._isSignedIn = localStorage.getItem(this._getUserIDKey()) !== null;
        }
        return this._isSignedIn;
    }

    _getUserIDKey() {
        return "userID";
    }

    _getTokenKey() {
        return "token";
    }
}

const userManager = new UserManager();

export default userManager;