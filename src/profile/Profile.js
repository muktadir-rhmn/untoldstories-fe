import React from 'react';
import Story from "../story/Story";
import {Col, Container, Row} from "react-bootstrap";
import storyAPI from "../apis/StoryAPI";
import ProcessingStatus from "../controls/ProcessingStatus";
import userAPI from "../apis/UserAPI";
import {Link} from "@reach/router";
import profilePaths from "./ProfilePaths";

class Profile extends React.Component{
    constructor(props)  {
        super(props);

        this.DEFAULT_PAGE_SIZE = 5;

        this.state = {
            stories: [],
            pageNo: -1,
            pageSize: this.DEFAULT_PAGE_SIZE,

            user: null,

            isProcessing: false,
        };
    }

    componentDidMount() {
        this.fetchUserStories(this.props.userID, 0, this.DEFAULT_PAGE_SIZE);
        this.fetchUserData(this.props.userID);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userID !== this.props.userID) {
            this.setState({
                pageNo: -1,
                stories: [],
                user: null,
            });

            this.fetchUserStories(this.props.userID, 0, this.DEFAULT_PAGE_SIZE);
            this.fetchUserData(this.props.userID);
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
                        <ProcessingStatus isProcessing={this.state.isProcessing} />
                        {storiesUI}
                    </Col>
                    <Col md="3">

                    </Col>
                </Row>
            </Container>
        );
    }

    renderStories(stories) {
        const storiesUI = [];
        for (let story of stories){
            storiesUI.push(<Story key={story.id} story={story}/>);
        }
        return storiesUI;
    }

    fetchUserStories(userID, pageNo, pageSize) {
        this.setState({
            isProcessing: true,
        })

        storyAPI.fetchStoriesOfAUser(userID, pageNo, pageSize).then(
            res => this.setState({
                stories: pageNo === 0 ? res.stories : this.state.stories.join(res.stories),
                pageNo: pageNo,
            })
        ).finally(
            () => this.setState({
                isProcessing: false,
            })
        );
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
        this.setState({
            isProcessing: true,
        })

        userAPI.fetchUserData(userID).then(
            res => this.setState({
                user: res
            })
        ).finally(
            () => this.setState({
                isProcessing: false,
            })
        )
    }
}

export default Profile;