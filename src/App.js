import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router} from "@reach/router";
import HeaderMain from "./header/HeaderMain";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import requester from "./lib/requester";
import Profile from "./profile/Profile";
import FullStory from "./story/FullStory";
import Home from "./Home";
import Message, {generateMessage} from "./controls/Message";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: null,
        };

        requester.setMessage((type, body) => this.showGlobalMessage(type, body));
    }

    showGlobalMessage(type, body) {
        this.setState({
            message: generateMessage(type, body),
        });
    }

    render() {
        return (
            <div className={"App"}>
                <HeaderMain/>
                <br/>
                <Message message={this.state.message} />
                <Router>
                    <SignIn path="/signin"/>
                    <SignUp path="/signup" />
                    <Home path="/" />
                    <Profile path="/profile/:userID"/>
                    <FullStory path="/story/:storyID"/>
                </Router>
            </div>
        );
    }
}

export default App;
