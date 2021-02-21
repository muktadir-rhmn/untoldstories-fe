import React from 'react';
import {Alert} from "react-bootstrap";

export const MessageType = {
    INFO: "info",
    SUCCESS:"success",
    ERROR: "danger",
};

export function generateMessage(type, body=null) {
    return {
        variant: type,
        body: body,
    };
}

export class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isClosed: false,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.message !== this.props.message) {
            this.setState({
                isClosed: false,
            });
        }
    }

    render() {
        const message = this.props.message;
        if (!message || this.state.isClosed) return "";

        return (<Alert variant={message.variant} onClose={() => this.setState({isClosed: true,})} dismissible>{message.body}</Alert>);
    }
}

export default Message;