import {requester} from "../lib/requester";

export const storyAPI = {

    fetchStoriesOfAUser: function (userID, pageNo, pageSize) {
        const path = "/stories";
        const query = {
            userID: userID,
            pageNo: pageNo,
            pageSize: pageSize,
        }

        return requester.get(path, query);
    },

    fetchStory: function (storyID) {
        const path = `/stories/${storyID}`;

        return requester.get(path);
    },

    addNew: function (body, privacy) {
        const path = "/stories";
        const data = {
            body: body,
            privacy: privacy,
        }

        return requester.post(path, data);
    },

    update: function (storyID, newBody, newPrivacy) {
        const path = `/stories/${storyID}`;
        const data = {
            body: newBody,
            privacy: newPrivacy,
        }

        return requester.put(path, data);
    },

    delete: function (storyID) {
        const path = `/stories/${storyID}`;

        return requester.delete(path);
    },

    like: function (storyID) {
        const path = `/stories/${storyID}/like`;

        return requester.post(path);
    },

    unlike: function (storyID) {
        const path = `/stories/${storyID}/reactions`;

        return requester.delete(path);
    }
}
