import requester from "../lib/requester";

const commentAPI = {
    add: (storyID, body) => {
        const path = `/comments`;
        const data = {
            storyID: storyID,
            body: body,
        }

        return requester.post(path, data);
    }
}

export default commentAPI;