import {requester} from "../lib/requester";

export const newsfeedAPI = {
    fetchStories(pageNo) {
        const path = "/newsfeed";
        const queryParams = {
            pageNo: pageNo
        };

        return requester.get(path, queryParams);
    }
}
