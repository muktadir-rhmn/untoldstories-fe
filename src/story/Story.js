import React from 'react';
import {Card} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faComment, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import {Link} from "@reach/router";
import profilePaths from "../profile/ProfilePaths";
import time from "../lib/time";
import {reaction} from "../backendConstants";
import storyPaths from "./StoryPaths";
import storyAPI from "../apis/StoryAPI";

class Story extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            didILikeIt: false,
            nLikes: 0,
        };
    }

    componentDidMount() {
        const story = this.props.story;
        if (story === null) return "";

        this.setState({
            didILikeIt: story.myReaction > reaction.NO_REACTION,
            nLikes: story.nLikes,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const story = this.props.story;
        if (story === null) return "";

        if (prevProps.story.id !== story.id) {
            this.setState({
                didILikeIt: story.myReaction > reaction.NO_REACTION,
                nLikes: story.nLikes,
            })
        }
    }

    render() {
        const story = this.props.story;
        if (story === null) return "";

        return (
            <Card className="mt-4">
                <Card.Body>
                    <Card.Title>
                        <Link to={profilePaths.timeline(story.author.id)}>{story.author.userName}</Link>
                    </Card.Title>
                    <Card.Subtitle className="mb-2">
                        <Link className="text-muted" to={storyPaths.fullStory(story.id)}>{time.epochToReadable(story.cTime)}</Link>
                    </Card.Subtitle>
                    <Card.Text>
                        {story.body}
                    </Card.Text>
                    {/*<Card.Text className="text-muted">{story.nViews} views</Card.Text>*/}
                </Card.Body>
                <Card.Footer className="p-0">
                    <div className="d-flex justify-content-between">
                        <div className="action-button p-2 text-center" style={{width: '50%', color: 'gray'}}>
                            <a href="#" className="d-block" onClick={() => this.likeUnlike()}>
                                <FontAwesomeIcon icon={faThumbsUp} size="2x" color={this.state.didILikeIt ? "green" : "gray"}/> {this.state.nLikes}
                            </a>
                        </div>
                        <div className="action-button p-2 text-center" style={{width: '50%'}}>
                            <Link to={storyPaths.fullStory(story.id)} className="d-block"><FontAwesomeIcon icon={faComment} size="2x" color="gray"/> {story.nComments}</Link>
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        );
    }

    likeUnlike() {
        const storyID = this.props.story.id;

        let promise;
        let dNLikes;
        if (this.state.didILikeIt) {
            promise = storyAPI.unlike(storyID);
            dNLikes = -1;
        } else {
            promise = storyAPI.like(storyID);
            dNLikes = 1;
        }

        promise.then(
            res => {
                this.setState({
                    didILikeIt: ~this.state.didILikeIt,
                    nLikes: this.state.nLikes + dNLikes,
                });
            }
        );
    }
}

export default Story;