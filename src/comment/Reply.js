import React from 'react';
import {Alert, Card, Dropdown, DropdownButton} from "react-bootstrap";
import {Link} from "@reach/router";
import {profilePaths} from "../profile/ProfilePaths";
import {time} from "../lib/time";
import {Reaction} from "../apis/backendConstants";
import {replyAPI} from "../apis/ReplyAPI";
import {ReactionControl} from "./ReactionControl";
import {userManager} from "../user/UserManager";

export class Reply extends React.Component {
    constructor(props)  {
        super(props);

        this.state = {
            myReaction: props.reply.myReaction,
            isDeleted: false,
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
        if (this.state.isDeleted) return <Alert variant="danger">Deleted</Alert>;
        const reply = this.props.reply;

        return (
            <Card className="mt-3">
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <div>
                            <Link to={profilePaths.timeline(reply.author.id)}>{reply.author.userName}</Link>
                            <span className="text-muted small">  {time.epochToReadable(reply.cTime)}</span>
                        </div>
                        {this.renderOptions(reply)}
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

    renderOptions(reply) {
        let options;
        if (userManager.getUserID() === reply.author.id) {
            options = (<DropdownButton
                variant="outline"
                menuAlign="right"
                title=""
                id={`story-${reply.id}`}
            >
                {/*<Dropdown.Item eventKey="1" onClick={() => this.switchToEdit()}>Edit</Dropdown.Item>*/}
                <Dropdown.Item eventKey="2" onClick={() => this.delete()}>Delete</Dropdown.Item>
            </DropdownButton>);
        }
        return options;
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

    delete() {
        replyAPI.delete(this.props.reply.id).then(
            () => this.setState({
                isDeleted: true,
            })
        )
    }

}
