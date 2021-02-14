import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router} from "@reach/router";
import HeaderMain from "./header/HeaderMain";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import Notifier from "./notifier/Notifier";
import requester from "./lib/requester";
import NewsFeed from "./newsfeed/NewsFeed";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifier: {
                nextNotificationID: 0,
                notifications: [],
            },
        }

        this.globalContext = {
            showNotification: (type, message) => this.showNotification(type, message),
        }
        Object.freeze(this.globalContext);

        requester.setPushNotify((type, message) => this.showNotification(type, message));
    }

    showNotification(type, message) {
        const notificationID = this.state.notifier.nextNotificationID++;
        this.state.notifier.notifications.push({id: notificationID, type: type, message: message});

        this.setState({});
    }

    removeNotification(notificationIDToRemove) {
        const notifications = this.state.notifier.notifications;

        let indexToRemove = null;
        for(let i = 0; i < notifications.length; i++) {
            if (notifications[i].id === notificationIDToRemove) {
                indexToRemove = i;
                break;
            }
        }

        if (indexToRemove === null) {
            console.error("Bug! push notification with id", notificationIDToRemove, "not found for removal");
            return;
        }

        notifications.splice(indexToRemove, 1);
        this.setState({});
    }

    render() {
        return (
            <div className={"App"}>
                <HeaderMain/>
                <br/>
                <Notifier notifications={this.state.notifier.notifications} removeNotification={id => this.removeNotification(id)}/>
                <Router>
                    <SignIn path="/signin"/>
                    <SignUp path="/signup" globalContext={this.globalContext}/>
                    <NewsFeed path="/" globalContext={this.globalContext}/>
                </Router>
            </div>
        );
    }
}

export default App;
