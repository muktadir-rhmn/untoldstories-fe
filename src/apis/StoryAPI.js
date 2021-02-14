import requester from "../lib/requester";

const storyAPI = {
    getNewsFeedStories: function (pageNo, pageSize) {
        const path = "/stories";
        const query = {
            pageNo: pageNo,
            pageSize: pageSize,
        }

        return requester.get(path, query);
    },

    getStoriesOfAUser: function (userID, pageNo, pageSize) {
        const path = "/stories";
        const query = {
            userID: userID,
            pageNo: pageNo,
            pageSize: pageSize,
        }

        return requester.get(path, query);
    },

    addNew: function (story, privacy) {
        const path = "/stories";
        const data = {
            story: story,
            privacy: privacy,
        }

        return requester.post(path, data);
    },

    update: function (storyID, newStory) {
        const path = `/stories/${storyID}`;
        const data = {
            story: newStory,
        }

        return requester.put(path, data);
    },

    delete: function (storyID) {
        const path = `/stories/${storyID}`;

        return requester.delete(path);
    },
}

export default storyAPI;