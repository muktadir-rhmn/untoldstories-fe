import React from 'react';
import {Alert, Button, Card, Dropdown, DropdownButton} from "react-bootstrap";
import {profilePaths} from "../profile/ProfilePaths";
import {Link} from "@reach/router";
import {time} from "../lib/time";
import {Reaction} from "../apis/backendConstants";
import {commentAPI} from "../apis/CommentAPI";
import {ReactionControl} from "./ReactionControl";
import {userManager} from "../user/UserManager";

export class Comment extends React.Component {
    constructor(props)  {
        super(props);

        this.state = {
            myReaction: props.comment.myReaction,
            isDeleted: false,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.comment.id !== this.props.comment.id) {
            this.setState({
                myReaction: this.props.comment.myReaction,
            });
        }
    }

    render() {
        if (this.state.isDeleted) return <Alert variant="danger">Deleted</Alert>;
        const comment = this.props.comment;

        return (
            <Card className="mt-3">
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <div>
                            <Link to={profilePaths.timeline(comment.author.id)}>{comment.author.userName}</Link>
                            <span className="text-muted small"> {time.epochToReadable(comment.cTime)} </span>
                        </div>

                        {this.renderOptions(comment)}
                    </div>

                    <Card.Text>
                        {comment.body}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted d-flex justify-content-between p-1">
                    <ReactionControl key={this.props.comment.id}
                                     myReaction={this.state.myReaction}
                                     nLikes={this.props.comment.nLikes}
                                     nDislikes={this.props.comment.nDislikes}
                                     onReact={reaction => this.handleOnReaction(reaction)}/>
                    <div>
                        <Button variant="outline-success" size="sm" onClick={() => this.props.onShowReplies()}>Replies</Button>
                    </div>
                </Card.Footer>
            </Card>
        );
    }

    renderOptions(comment) {
        let options;
        if (userManager.getUserID() === comment.author.id) {
            options = (<DropdownButton
                variant="outline"
                menuAlign="right"
                title=""
                id={`story-${comment.id}`}
            >
                {/*<Dropdown.Item eventKey="1" onClick={() => this.switchToEdit()}>Edit</Dropdown.Item>*/}
                <Dropdown.Item eventKey="2" onClick={() => this.delete()}>Delete</Dropdown.Item>
            </DropdownButton>);
        }
        return options;
    }

    handleOnReaction(reaction) {
        const storyID = this.props.storyID;
        const commentID = this.props.comment.id;
        const myCurReaction = this.state.myReaction;

        let promise;
        let newReaction;
        if (reaction === myCurReaction) {
            promise = commentAPI.deleteReaction(commentID);
            newReaction = Reaction.NO_REACTION;
        } else if (reaction === Reaction.LIKE) {
            promise = commentAPI.like(storyID, commentID);
            newReaction = Reaction.LIKE;
        } else if (reaction === Reaction.DISLIKE) {
            promise = commentAPI.dislike(storyID, commentID);
            newReaction = Reaction.DISLIKE;
        }

        promise.then(
            () => this.setState({
                myReaction: newReaction,
            })
        )
    }

    delete() {
        commentAPI.delete(this.props.comment.id).then(
            () => this.setState({
                isDeleted: true,
            })
        )
    }
}
