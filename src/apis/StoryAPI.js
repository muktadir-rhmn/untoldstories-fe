import {requester} from "../lib/requester";

export const storyAPI = {

    fetchStoriesOfAUser(userID, pageNo, pageSize) {
        const path = "/stories";
        const query = {
            userID: userID,
            pageNo: pageNo,
            pageSize: pageSize,
        }

        return requester.get(path, query);
    },

    fetchStory(storyID) {
        const path = `/stories/${storyID}`;

        return requester.get(path);
    },

    addNew(body, privacy) {
        const path = "/stories";
        const data = {
            body: body,
            privacy: privacy,
        }

        return requester.post(path, data);
    },

    update(storyID, newBody, newPrivacy) {
        const path = `/stories/${storyID}`;
        const data = {
            body: newBody,
            privacy: newPrivacy,
        }

        return requester.put(path, data);
    },

    delete(storyID) {
        const path = `/stories/${storyID}`;

        return requester.delete(path);
    },

    like(storyID) {
        const path = `/stories/${storyID}/like`;

        return requester.post(path);
    },

    unlike(storyID) {
        const path = `/stories/${storyID}/reactions`;

        return requester.delete(path);
    }
}
