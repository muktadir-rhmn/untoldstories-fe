import React from 'react';
import {Story} from "../story/Story";
import {Col, Container, Row} from "react-bootstrap";
import {storyAPI} from "../apis/StoryAPI";
import {userAPI} from "../apis/UserAPI";
import {Link} from "@reach/router";
import {profilePaths} from "./ProfilePaths";
import {ProcessButton, ProcessingButtonStatus} from "../controls/ProcessButton";

export class Profile extends React.Component {
    constructor(props)  {
        super(props);

        this.DEFAULT_PAGE_SIZE = 5;
        this.pageSize = this.DEFAULT_PAGE_SIZE;

        this.initialState = () => {
            return {
                pageNo: -1,
                stories: [],
                user: null,

                hasMoreStories: true,
                processingStatus: ProcessingButtonStatus.PROCESSING,
            };
        };

        this.state = this.initialState();
    }

    componentDidMount() {
        this.fetchUserData(this.props.userID);
        this.fetchUserStories(this.props.userID, 0);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userID !== this.props.userID) {
            this.setState(this.initialState());
            this.fetchUserData(this.props.userID);
            this.fetchUserStories(this.props.userID, 0);
        }
    }

    render() {
        const storiesUI = this.renderStories(this.state.stories);

        return (
            <Container className="p-0">
                {this.renderHeading()}

                <Row>
                    <Col md="3">

                    </Col>
                    <Col md="6">
                        <h3 className="text-muted">Stories</h3>
                        {storiesUI}

                        <div className="card">
                            <ProcessButton variant="success"
                                           status={this.state.processingStatus}
                                           hide={!this.state.hasMoreStories}
                                           onClick={() => this.fetchUserStories(this.props.userID, this.state.pageNo + 1)}
                            >Load More</ProcessButton>
                        </div>
                    </Col>
                    <Col md="3">

                    </Col>
                </Row>
            </Container>
        );
    }

    renderStories(stories) {
        const storiesUI = [];
        for (let story of stories) {
            storiesUI.push(<Story key={story.id} story={story}/>);
        }
        return storiesUI;
    }

    renderHeading() {
        if (this.state.user === null) return "";

        const userName = this.state.user.userName;
        const profileLink = profilePaths.timeline(this.state.user.id);

        return(
            <Row>
                <Col className="text-center">
                    <h1><Link to={profileLink}>{userName}</Link></h1>
                </Col>
            </Row>
        )
    }

    fetchUserData(userID) {
        this.setProcessing();

        userAPI.fetchUserData(userID).then(
            res => this.setState({
                user: res
            })
        ).finally(
            () => this.unsetProcessing(),
        )
    }

    fetchUserStories(userID, pageNo) {
        this.setProcessing();

        storyAPI.fetchStoriesOfAUser(userID, pageNo, this.pageSize).then(
            res => {
                this.setState({
                    stories: pageNo === 0 ? res.stories : this.state.stories.concat(res.stories),
                    pageNo: pageNo,
                    hasMoreStories: res.stories.length === this.pageSize,
                });
            }
        ).finally(
            () => this.unsetProcessing()
        );
    }

    setProcessing() {
        this.setState({
            processingStatus: ProcessingButtonStatus.PROCESSING,
        });
    }

    unsetProcessing() {
        this.setState({
            processingStatus: ProcessingButtonStatus.IDLE,
        });
    }
}
