import requester from "../lib/requester";

const newsfeedAPI = {
    fetchStories: (pageNo) => {
        const path = "/newsfeed";
        const queryParams = {
            pageNo: pageNo
        };

        return requester.get(path, queryParams);
    }
}

export default newsfeedAPI;