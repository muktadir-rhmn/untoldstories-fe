import requester from "../lib/requester";

const replyAPI = {
    add: (storyID, commentID, body) => {
        const path = `/replies`;
        const data = {
            storyID: storyID,
            commentID: commentID,
            body: body,
        }

        return requester.post(path, data);
    },

    update: (replyID, body) => {
        const path = `/replies/${replyID}`;
        const data = {
            body: body
        };

        return requester.put(path, data);
    },

    delete: (replyID) => {
        const path = `/replies/${replyID}`;

        return requester.delete(path);
    },

    fetchRepliesOfStory: (storyID) => {
        const path = `/replies`;
        const queryParams = {
            storyID: storyID
        };

        return requester.get(path, queryParams);
    },

    fetchRepliesOfComment(commentID) {
        const path = `/replies`;
        const queryParams = {
            commentID: commentID
        };

        return requester.get(path, queryParams);
    }
}

export default replyAPI;