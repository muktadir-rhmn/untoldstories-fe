import React from 'react';
import {Alert, Card, Dropdown, DropdownButton} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleNotch, faComment, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import {Link} from "@reach/router";
import profilePaths from "../profile/ProfilePaths";
import time from "../lib/time";
import {Reaction, StoryPrivacy} from "../backendConstants";
import storyPaths from "./StoryPaths";
import storyAPI from "../apis/StoryAPI";
import UpdateStory from "./UpdateStory";
import userManager from "../user/UserManager";

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
            didILikeIt: story.myReaction > Reaction.NO_REACTION,
            body: story.body,
            privacy: story.privacy,
            nLikes: story.nLikes,
            isDeleted: false,
            isUpdate: false,
        })
    }

    render() {
        const story = this.props.story;
        if (story === null) return "";

        if (this.state.isDeleted) return <Alert variant="danger">Deleted</Alert>;
        if (this.state.isUpdate) return (<UpdateStory key={story.id}
                                                      id={story.id}
                                                      body={this.state.body}
                                                      privacy={this.state.privacy}
                                                      onFinish={(hasUpdated, body=null, privacy=null) => this.onUpdateFinish(hasUpdated, body, privacy)}
                                        />);

        let options;
        if (userManager.getUserID() === story.author.id) {
            options = (<DropdownButton
                variant="outline"
                menuAlign="right"
                title=""
                id={`story-${story.id}`}
            >
                <Dropdown.Item eventKey="1" onClick={() => this.switchToEdit()}>Edit</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={() => this.delete()}>Delete</Dropdown.Item>
            </DropdownButton>);
        }

        let privacy;
        if (this.state.privacy === StoryPrivacy.PUBLIC) privacy = "Public";
        else if (this.state.privacy === StoryPrivacy.PRIVATE) privacy = "Private";

        return (
            <Card className="mt-4">
                <Card.Body>
                    <Card.Title>
                        <div className="d-flex justify-content-between">
                            <Link to={profilePaths.timeline(story.author.id)}>{story.author.userName}</Link>
                            {options}
                        </div>
                    </Card.Title>
                    <Card.Subtitle className="mb-2">
                        <Link className="text-muted" to={storyPaths.fullStory(story.id)}>
                            {privacy} <FontAwesomeIcon icon={faCircleNotch} size="xs"/> {time.epochToReadable(story.cTime)}
                        </Link>
                    </Card.Subtitle>
                    <Card.Text>
                        {this.state.body}
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
            () => {
                this.setState({
                    didILikeIt: dNLikes === 1,
                    nLikes: this.state.nLikes + dNLikes,
                });
            }
        );
    }

    delete() {
        if(!window.confirm("Do you want to delete it?")) return;

        storyAPI.delete(this.props.story.id).then(
            () => this.setState({
                isDeleted: true,
            })
        )
    }

    onUpdateFinish(hasUpdated, body, privacy) {
        if (!hasUpdated) {
            this.setState({
                isUpdate: false,
            })
            return;
        }

        this.setState({
            isUpdate: false,
            body: body,
            privacy: privacy,
        });

    }

    switchToEdit() {
        this.setState({
            isUpdate: true,
        });
    }
}

export default Story;