import requester from "../lib/requester";

const commentAPI = {
    add: (storyID, body) => {
        const path = `/comments`;
        const data = {
            storyID: storyID,
            body: body,
        }

        return requester.post(path, data);
    },

    update: (commentID, body) => {
        const path = `/comments/${commentID}`;
        const data = {
            body: body
        };

        return requester.put(path, data);
    },

    delete: (commentID) => {
        const path = `/comments/${commentID}`;

        return requester.delete(path);
    },

    fetchCommentsOfStory: (storyID) => {
        const path = `/comments`;
        const queryParams = {
            storyID: storyID
        };

        return requester.get(path, queryParams);
    },
}

export default commentAPI;