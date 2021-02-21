import React from 'react';
import {Comment} from "./Comment";
import {ReplyBox} from "./ReplyBox";
import {replyAPI} from "../apis/ReplyAPI";
import {ProcessingStatus} from "../controls/ProcessingStatus";
import {Reply} from "./Reply";

export class CommentWithReplies extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            showReplySection: false,
            replies: null,
        };
    }

    render() {
        const comment = this.props.comment;
        const repliesUI = this.renderReplies(this.state.replies);

        return (
            <div>
                <Comment storyID={this.props.storyID}
                         comment={comment}
                         onShowReplies={() => this.handleShowReplies()}/>
                <div className={"ml-5 pl-3 pr-3 pt-1 pb-2 bg-light " + (this.state.showReplySection ? "" : "d-none")}>
                    <ReplyBox commentID={comment.id} storyID={this.props.storyID} />
                    <ProcessingStatus isProcessing={this.state.replies === null}/>
                    {repliesUI}
                </div>
            </div>
        );
    }

    handleShowReplies() {
        if (this.state.showReplySection) return;

        this.setState({
            showReplySection: true,
        });

        this.fetchReplies(this.props.comment.id);
    }

    fetchReplies(commentID) {
        replyAPI.fetchRepliesOfComment(commentID).then(
            res => {
                this.setState({
                    replies: res.replies,
                });
            }
        )
    }

    renderReplies(replies) {
        if (replies === null) return "";

        const repliesUI = [];
        for (let i = 0; i < replies.length; i++) {
            repliesUI.push(this.renderReply(replies[i]));
        }
        return repliesUI;
    }

    renderReply(reply) {
        return <Reply key={reply.id} reply={reply} commentID={this.props.comment.id}/>;
    }
}
