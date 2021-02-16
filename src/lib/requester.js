import userManager from "../user/UserManager";
import {ErrorResponseID} from "../backendConstants";
import NotificationTypes from "../notifier/notificationTypes";

const RESPONSE_STATUS_CODE = {
    OK: 200,
    VALIDATION_ERROR: 400,
    INTERNAL_SERVER_ERROR: 500,
}

class Requester {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    setPushNotify(pushNotify) {
        this._pushNotify = pushNotify;
    }

    get(path, queryParams={}) {
        let queryString = "";
        for(let key in queryParams) {
            if(queryString !== "") queryString += "&";
            queryString += `${key}=${queryParams[key]}`;
        }
        const pathAndQuery = `${path}?${queryString}`;

        return this._GET_POST_PUT_DELETE("GET", pathAndQuery)
    }

    post(path, requestBody={}) {
        return this._GET_POST_PUT_DELETE("POST", path, requestBody);
    }

    put(path, requestBody) {
        return this._GET_POST_PUT_DELETE("PUT", path, requestBody);
    }

    delete(path) {
        return this._GET_POST_PUT_DELETE("DELETE", path);
    }

    _GET_POST_PUT_DELETE(methodName, path, requestBody={}) {
        const url = `${this.baseURL}${path}`;
        console.log("Sending request: ", methodName, url);

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    const responseStatusCode =  xhr.status;
                    if (responseStatusCode === 0) {
                        this.showErrorMessage("Failed to connect to the server");
                        reject(null);
                    }

                    const responseObject = JSON.parse(xhr.responseText);
                    if (responseStatusCode === RESPONSE_STATUS_CODE.OK) {
                        console.log("Success response:", responseObject);
                        resolve(responseObject);
                    } else if (responseStatusCode === RESPONSE_STATUS_CODE.VALIDATION_ERROR) {
                        console.log("Failed response:", responseObject);

                        if (responseObject.id === ErrorResponseID.SINGLE_ERROR_MESSAGE){
                            this.showErrorMessage(responseObject.msg);
                            reject(null);
                        } else if (responseObject.id === ErrorResponseID.ERROR_MESSAGE_PER_FIELD) {
                            reject(responseObject); //let the UI show errors by field
                        } else {
                            this.showErrorMessage("Unknown error occurred");
                            console.error("Bug found. Unknown Response Error ID. \nRequest: ", methodName, url, requestBody, "\nResponse:", responseObject);
                            reject(null);
                        }
                    } else if (responseStatusCode === RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR) {
                        this.showErrorMessage("An error occurred in the server");
                        console.error("Internal Server Error. \nRequest: ", methodName, url, requestBody, "\nResponse:", responseObject);
                        reject(null);
                    }
                    reject(null);
                }
            }
            xhr.open(methodName, url, true);

            if (methodName !== "GET") xhr.setRequestHeader("Content-Type", "application/json");
            if (userManager.isSignedIn()) xhr.setRequestHeader("token", userManager.getToken());

            try {
                xhr.send(JSON.stringify(requestBody));
            } catch (ex) {
                this.showErrorMessage("Could not connect to the server");
                console.error("Failed to connect tot eh server");
                reject(null);
            }

        });
    }

    showErrorMessage(message) {
        if (this._pushNotify) this._pushNotify(NotificationTypes.ERROR, message);
        else console.error("Notifier not setup for Requester. So, the user won't see the message: ", message);
    }
}

const requester = new Requester("http://localhost:8080");
export default requester;