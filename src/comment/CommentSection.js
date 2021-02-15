import React from 'react';
import CommentBox from "./CommentBox";
import NotificationTypes from "../notifier/notificationTypes";

class CommentSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const commentsUI = "CommentsUI";

        return (
            <div>
                <CommentBox storyID={this.props.storyID} onComment={comment => this.handleNewComment(comment)} />
                {commentsUI}
            </div>
        );
    }

    handleNewComment(comment) {
        this.props.globalContext.showNotification(NotificationTypes.SUCCESS, "Posted the comment");
        //todo: add in the comment list
        //todo: update number of comments in the story card
    }
}

export default CommentSection;