class UserManager {
    constructor() {
        this._isSignedIn = null;
    }

    getToken() {
        return localStorage.getItem(this._getTokenKey());
    }

    addSignInInfo(userID, userName, token) {
        localStorage.setItem(this._getUserIDKey(), userID);
        localStorage.setItem(this._getUserNameKey(), userName);
        localStorage.setItem(this._getTokenKey(), token);

        this._isSignedIn = userID != null;
    }

    removeSignInInfo() {
        this._isSignedIn = false;

        localStorage.removeItem(this._getUserIDKey());
        localStorage.removeItem(this._getUserNameKey());
        localStorage.removeItem(this._getTokenKey());
    }

    isSignedIn() {
        if (this._isSignedIn === null) {
            this._isSignedIn = localStorage.getItem(this._getUserIDKey()) !== null;
        }
        return this._isSignedIn;
    }

    getUserID() {
        return parseInt(localStorage.getItem(this._getUserIDKey()));
    }

    getUserName() {
        return localStorage.getItem(this._getUserNameKey());
    }

    _getUserIDKey() {
        return "userID";
    }

    _getUserNameKey() {
        return "userName";
    }

    _getTokenKey() {
        return "token";
    }
}

export const userManager = new UserManager();
