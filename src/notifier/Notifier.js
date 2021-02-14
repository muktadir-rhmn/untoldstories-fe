import React from 'react';
import {Alert} from "react-bootstrap";
import notificationTypes from "./notificationTypes";

class Notifier extends React.Component {

    render() {
        const toasts = [];

        const notifications = this.props.notifications;
        for (let i = 0; i < notifications.length; i++) {
            const toast = this.buildNotificationToast(notifications[i]);
            toasts.push(toast);
        }

        return (
            <div className="mx-auto" style={{maxWidth: "800px"}}>
                {toasts}
            </div>
        );
    }

    buildNotificationToast(notification) {
        let variant = "";
        if (notification.type === notificationTypes.INFO) {
            variant = "info";
        } else if (notification.type === notificationTypes.SUCCESS) {
            variant = "success";
        } else if (notification.type === notificationTypes.ERROR) {
            variant = "danger";
        } else {
            console.error("Unknown notification type", notification)
        }

        return (
            <Alert key={notification.id} variant={variant} onClose={() => this.props.removeNotification(notification.id)} dismissible>
                {notification.message}
            </Alert>
        )
    }
}

export default Notifier;