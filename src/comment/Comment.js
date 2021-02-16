import React from 'react';
import {Button, Card} from "react-bootstrap";
import profilePaths from "../profile/ProfilePaths";
import {Link} from "@reach/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp, faThumbsDown} from "@fortawesome/free-solid-svg-icons";
import time from "../lib/time";

class Comment extends React.Component {
    constructor(props)  {
        super(props);

        this.state = {};
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
                        <FontAwesomeIcon icon={faThumbsUp} color={this.state.didILikeIt ? "green" : "gray"}/>
                        <span>150  </span>
                        <FontAwesomeIcon icon={faThumbsDown} color={this.state.didILikeIt ? "green" : "gray"}/>
                        <span>150  </span>
                    </div>
                    <div>
                        <Button variant="outline-success" size="sm" onClick={() => this.props.onShowReplies()}>Replies</Button>
                    </div>
                </Card.Footer>
            </Card>
        );
    }
}

export default Comment;