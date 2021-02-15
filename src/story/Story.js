import React from 'react';
import {Alert, Card, Dropdown, DropdownButton} from "react-bootstrap";
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

        this.state = {};
    }

    componentDidMount() {
        const story = this.props.story;
        if (story === null) return "";

        this.initState(story);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const story = this.props.story;
        if (story === null) return "";

        if (prevProps.story.id !== story.id) {
            this.initState(story);
        }
    }

    initState(story) {
        this.setState({
            didILikeIt: story.myReaction > reaction.NO_REACTION,
            nLikes: story.nLikes,
            isDeleted: false,
        })
    }

    render() {
        const story = this.props.story;
        if (story === null) return "";
        if (this.state.isDeleted) return <Alert variant="danger">Deleted</Alert>;

        return (
            <Card className="mt-4">
                <Card.Body>
                    <Card.Title>
                        <div className="d-flex justify-content-between">
                            <Link to={profilePaths.timeline(story.author.id)}>{story.author.userName}</Link>
                            <DropdownButton
                                variant="outline"
                                menuAlign="right"
                                title=""
                                id={`story-${story.id}`}
                            >
                                <Dropdown.Item eventKey="1">Edit</Dropdown.Item>
                                <Dropdown.Item eventKey="2" onClick={() => this.delete()}>Delete</Dropdown.Item>
                            </DropdownButton>
                        </div>
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

    delete() {
        storyAPI.delete(this.props.story.id).then(
            () => this.setState({
                isDeleted: true,
            })
        )
    }
}

export default Story;