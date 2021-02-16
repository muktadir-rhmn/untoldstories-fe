import React from 'react';
import CommentBox from "./CommentBox";
import commentAPI from "../apis/CommentAPI";
import CommentWithReplies from "./CommentWithReplies";

class CommentSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
        };
    }

    componentDidMount() {
        this.fetchComments(this.props.storyID);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.storyID !== this.props.storyID) {
            this.setState({comments: []});
            this.fetchComments(this.props.storyID);
        }
    }

    render() {
        const commentsUI = this.renderCommentsUI(this.state.comments);

        return (
            <div>
                <CommentBox storyID={this.props.storyID} onComment={comment => this.handleNewComment(comment)} />
                {commentsUI}
            </div>
        );
    }


    handleNewComment(comment) {
        //todo: add in the comment list
        //todo: update number of comments in the story card
    }

    renderCommentsUI(comments) {
        if (comments.length === 0) return "";

        const commentsUI = [];
        for (let i = 0; i < comments.length; i++) {
            commentsUI.push(this.renderCommentUI(comments[i]));
        }
        return commentsUI;
    }

    renderCommentUI(comment) {
        return <CommentWithReplies key={comment.id} storyID={this.props.storyID} comment={comment}/>;
    }

    fetchComments(storyID) {
        commentAPI.fetchCommentsOfStory(storyID).then(
            res => {
                this.setState({
                    comments: res.comments,
                });
            }
        )
    }
}

export default CommentSection;