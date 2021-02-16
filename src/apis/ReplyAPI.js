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

    like: (commentID, replyID) => {
        const path = `/replies/${replyID}/like`;
        const data = {
            commentID: commentID,
        }

        return requester.post(path, data);
    },

    dislike: (commentID, replyID) => {
        const path = `/replies/${replyID}/dislike`;
        const data = {
            commentID: commentID,
        }

        return requester.post(path, data);
    },

    deleteReaction: (replyID) => {
        const path = `/replies/${replyID}/reactions`;

        return requester.delete(path);
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