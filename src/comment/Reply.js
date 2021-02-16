import React from 'react';
import {Card} from "react-bootstrap";
import {Link} from "@reach/router";
import profilePaths from "../profile/ProfilePaths";
import time from "../lib/time";
import {Reaction} from "../backendConstants";
import replyAPI from "../apis/ReplyAPI";
import ReactionControl from "./ReactionControl";

class Reply extends React.Component {
    constructor(props)  {
        super(props);

        this.state = {
            myReaction: props.reply.myReaction,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.reply.id !== this.props.reply.id) {
            this.setState({
                myReaction: this.props.reply.myReaction,
            });
        }
    }

    render() {
        const reply = this.props.reply;

        return (
            <Card className="mt-3">
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <Link to={profilePaths.timeline(reply.author.id)}>{reply.author.userName}</Link>
                        <span className="text-muted">{time.epochToReadable(reply.cTime)}</span>
                    </div>

                    <Card.Text>
                        {reply.body}
                    </Card.Text>
                    <ReactionControl key={this.props.reply.id}
                                     myReaction={this.state.myReaction}
                                     nLikes={this.props.reply.nLikes}
                                     nDislikes={this.props.reply.nDislikes}
                                     onReact={reaction => this.handleOnReaction(reaction)}/>
                </Card.Body>
            </Card>
        );
    }

    handleOnReaction(reaction) {
        const commentID = this.props.commentID;
        const replyID = this.props.reply.id;
        const myCurReaction = this.state.myReaction;

        let promise;
        let newReaction;
        if (reaction === myCurReaction) {
            promise = replyAPI.deleteReaction(replyID);
            newReaction = Reaction.NO_REACTION;
        } else if (reaction === Reaction.LIKE) {
            promise = replyAPI.like(commentID, replyID);
            newReaction = Reaction.LIKE;
        } else if (reaction === Reaction.DISLIKE) {
            promise = replyAPI.dislike(commentID, replyID);
            newReaction = Reaction.DISLIKE;
        }

        promise.then(
            () => this.setState({
                myReaction: newReaction,
            })
        )
    }

}

export default Reply;