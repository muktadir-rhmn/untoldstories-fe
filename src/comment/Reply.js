import React from 'react';
import {Card} from "react-bootstrap";
import {Link} from "@reach/router";
import profilePaths from "../profile/ProfilePaths";
import time from "../lib/time";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";

class Reply extends React.Component {
    constructor(props)  {
        super(props);

        this.state = {};
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
                        <FontAwesomeIcon icon={faThumbsUp} color={this.state.didILikeIt ? "green" : "gray"}/>
                        <span>150  </span>
                        <FontAwesomeIcon icon={faThumbsDown} color={this.state.didILikeIt ? "green" : "gray"}/>
                        <span>150  </span>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default Reply;