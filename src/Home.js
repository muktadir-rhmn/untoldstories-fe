import React from 'react';
import userManager from "./user/UserManager";
import NewsFeed from "./newsfeed/NewsFeed";
import LandingPage from "./landing_page/LandingPage";

class Home extends React.Component {

    render() {
        if (userManager.isSignedIn()) return <NewsFeed/>;
        else return <LandingPage/>;
    }
}

export default Home;