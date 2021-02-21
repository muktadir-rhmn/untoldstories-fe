import {requester} from "../lib/requester";

export const commentAPI = {
    add(storyID, body) {
        const path = `/comments`;
        const data = {
            storyID: storyID,
            body: body,
        }

        return requester.post(path, data);
    },

    update(commentID, body) {
        const path = `/comments/${commentID}`;
        const data = {
            body: body
        };

        return requester.put(path, data);
    },

    delete(commentID) {
        const path = `/comments/${commentID}`;

        return requester.delete(path);
    },

    like(storyID, commentID) {
        const path = `/comments/${commentID}/like`;
        const data = {
            storyID: storyID,
        }

        return requester.post(path, data);
    },

    dislike(storyID, commentID) {
        const path = `/comments/${commentID}/dislike`;
        const data = {
            storyID: storyID,
        }

        return requester.post(path, data);
    },

    deleteReaction(commentID) {
        const path = `/comments/${commentID}/reactions`;

        return requester.delete(path);
    },

    fetchCommentsOfStory(storyID) {
        const path = `/comments`;
        const queryParams = {
            storyID: storyID
        };

        return requester.get(path, queryParams);
    },
}
