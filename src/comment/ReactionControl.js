import React from 'react';
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {Reaction} from "../apis/backendConstants";

export class ReactionControl extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = () => {
            return {
                deltaLikes: 0,
                deltaDislikes: 0,
            }
        }

        this.state = this.initialState();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const myPrevReaction = prevProps.myReaction;
        const myCurReaction = this.props.myReaction;

        if (myPrevReaction !== myCurReaction) {

            let deltaLikes = this.state.deltaLikes;
            let deltaDislikes = this.state.deltaDislikes;

            if (myPrevReaction === Reaction.NO_REACTION) {
                if (myCurReaction === Reaction.LIKE)  deltaLikes += 1;
                else deltaDislikes += 1;
            } else if (myCurReaction === Reaction.NO_REACTION) {
                if (myPrevReaction === Reaction.LIKE)  deltaLikes += -1;
                else deltaDislikes += -1;
            } else {
                if (myCurReaction === Reaction.LIKE)  {
                    deltaLikes += 1;
                    deltaDislikes += -1;
                } else {
                    deltaLikes += -1;
                    deltaDislikes += 1;
                }
            }

            this.setState({
                deltaLikes: deltaLikes,
                deltaDislikes: deltaDislikes,
            });
        }
    }

    render() {
        const nLikes = this.props.nLikes + this.state.deltaLikes;
        const nDislikes = this.props.nDislikes + this.state.deltaDislikes;
        const myReaction = this.props.myReaction;

        return (
            <div>
                <Button variant="light" size="sm" onClick={() => this.props.onReact(Reaction.LIKE)}>
                    <FontAwesomeIcon icon={faThumbsUp} color={myReaction === Reaction.LIKE ? "green" : "gray"}/>
                    <span>{nLikes <= 0 ? "" : nLikes}  </span>
                </Button>
                <Button variant="light" size="sm" onClick={() => this.props.onReact(Reaction.DISLIKE)}>
                    <FontAwesomeIcon icon={faThumbsDown} color={myReaction === Reaction.DISLIKE ? "green" : "gray"}/>
                    <span>{nDislikes <= 0 ? "" : nDislikes}  </span>
                </Button>
            </div>
        );
    }
}
