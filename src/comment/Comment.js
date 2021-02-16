import React from 'react';
import {Button, Card} from "react-bootstrap";
import profilePaths from "../profile/ProfilePaths";
import {Link} from "@reach/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import time from "../lib/time";
import {Reaction} from "../backendConstants";
import commentAPI from "../apis/CommentAPI";

class Comment extends React.Component {
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
            myReaction: this.props.comment.myReaction,
            deltaNLikes: 0,
            deltaNDislikes: 0,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.comment.id !== this.props.comment.id) {
            this.setState({
                myReaction: this.props.comment.myReaction,
                deltaNLikes: 0,
                deltaNDislikes: 0,
            });
        }
    }

    render() {
        const comment = this.props.comment;

        return (
            <Card className="mt-3">
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <Link to={profilePaths.timeline(comment.author.id)}>{comment.author.userName}</Link>
                        <span className="text-muted">{time.epochToReadable(comment.cTime)}</span>
                    </div>

                    <Card.Text>
                        {comment.body}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted d-flex justify-content-between">
                    <div>
                        <Button variant="light" size="sm" onClick={() => this.like()}>
                            <FontAwesomeIcon icon={faThumbsUp} color={this.state.didILikeIt ? "green" : "gray"}/>
                            <span>{comment.nLikes + this.state.deltaNLikes}  </span>
                        </Button>
                        <Button variant="light" size="sm" onClick={() => this.dislike()}>
                            <FontAwesomeIcon icon={faThumbsDown} color={this.state.didILikeIt ? "green" : "gray"}/>
                            <span>{comment.nDislikes + this.state.deltaNDislikes}  </span>
                        </Button>
                    </div>
                    <div>
                        <Button variant="outline-success" size="sm" onClick={() => this.props.onShowReplies()}>Replies</Button>
                    </div>
                </Card.Footer>
            </Card>
        );
    }

    like() {
        const storyID = this.props.storyID;
        const commentID = this.props.comment.id;
        const myCurReaction = this.state.myReaction;

        if (myCurReaction === Reaction.LIKE) {
            commentAPI.deleteReaction(commentID).then(
                () => this.updateReactionState(Reaction.NO_REACTION, -1, 0)
            );
        } else {
            commentAPI.like(storyID, commentID).then(
                () => this.updateReactionState(Reaction.LIKE, 1, myCurReaction === Reaction.DISLIKE ? -1 : 0)
            )
        }
    }

    dislike() {
        const storyID = this.props.storyID;
        const commentID = this.props.comment.id;
        const myCurReaction = this.state.myReaction;

        if (myCurReaction === Reaction.DISLIKE) {
            commentAPI.deleteReaction(commentID).then(
                () => this.updateReactionState(Reaction.NO_REACTION, 0, -1)
            );
        } else {
            commentAPI.dislike(storyID, commentID).then(
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

export default Comment;