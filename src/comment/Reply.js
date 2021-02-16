import React from 'react';
import {Button, Card} from "react-bootstrap";
import {Link} from "@reach/router";
import profilePaths from "../profile/ProfilePaths";
import time from "../lib/time";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {Reaction} from "../backendConstants";
import replyAPI from "../apis/ReplyAPI";

class Reply extends React.Component {
    constructor(props)  {
        super(props);

        this.initialState = () => {
            return {
                myReaction: Reaction.NO_REACTION,
                deltaNLikes: 0,
                deltaNDislikes: 0,
            };
        };

        this.state = this.initialState();
    }

    componentDidMount() {
        this.setState({
            myReaction: this.props.reply.myReaction,
            deltaNLikes: 0,
            deltaNDislikes: 0,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.reply.id !== this.props.reply.id) {
            this.setState({
                myReaction: this.props.reply.myReaction,
                deltaNLikes: 0,
                deltaNDislikes: 0,
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
                    <div>
                        <Button variant="light" size="sm" onClick={() => this.like()}>
                            <FontAwesomeIcon icon={faThumbsUp} color={this.state.didILikeIt ? "green" : "gray"}/>
                            <span>{reply.nLikes + this.state.deltaNLikes}  </span>
                        </Button>
                        <Button variant="light" size="sm" onClick={() => this.dislike()}>
                            <FontAwesomeIcon icon={faThumbsDown} color={this.state.didILikeIt ? "green" : "gray"}/>
                            <span>{reply.nDislikes + this.state.deltaNDislikes}  </span>
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        );
    }

    like() {
        const commentID = this.props.commentID;
        const replyID = this.props.reply.id;
        const myCurReaction = this.state.myReaction;

        if (myCurReaction === Reaction.LIKE) {
            replyAPI.deleteReaction(replyID).then(
                () => this.updateReactionState(Reaction.NO_REACTION, -1, 0)
            );
        } else {
            replyAPI.like(commentID, replyID).then(
                () => this.updateReactionState(Reaction.LIKE, 1, myCurReaction === Reaction.DISLIKE ? -1 : 0)
            )
        }
    }

    dislike() {
        const commentID = this.props.commentID;
        const replyID = this.props.reply.id;
        const myCurReaction = this.state.myReaction;

        if (myCurReaction === Reaction.DISLIKE) {
            replyAPI.deleteReaction(replyID).then(
                () => this.updateReactionState(Reaction.NO_REACTION, 0, -1)
            );
        } else {
            replyAPI.dislike(commentID, replyID).then(
                () => this.updateReactionState(Reaction.DISLIKE, myCurReaction === Reaction.LIKE ? -1 : 0, 1)
            )
        }
    }

    updateReactionState(myNewReaction, deltaDeltaNLikes, deltaDeltaNDislikes) {
        const deltaNLikes = this.state.deltaNLikes + deltaDeltaNLikes;
        const deltaNDislikes = this.state.deltaNDislikes + deltaDeltaNDislikes;

        this.setState({
            myReaction: myNewReaction,
            deltaNLikes: deltaNLikes,
            deltaNDislikes: deltaNDislikes,
        });
    }
}

export default Reply;