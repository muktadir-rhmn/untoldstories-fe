import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import ProcessingStatus from "../controls/ProcessingStatus";
import Story from "./Story";
import CommentSection from "../comment/CommentSection";
import storyAPI from "../apis/StoryAPI";

class FullStory extends React.Component{
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        this.initState();
        this.fetchStory(this.props.storyID);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.storyID !== this.props.storyID) {
            this.initState();
            this.fetchStory(this.props.storyID);
        }
    }

    initState() {
        this.setState({
            story: null,
        })
    }

    render() {
        const story = this.state.story;
        if (story == null) return <ProcessingStatus isProcessing/>;
        
        return (
            <Container className="p-0">
                <Row>
                    <Col md="3">

                    </Col>
                    <Col md="6">
                        <Story story={this.state.story} />
                        <CommentSection storyID={this.state.story.id}/>
                    </Col>
                    <Col md="3">

                    </Col>
                </Row>
            </Container>
        );
    }

    fetchStory(storyID) {
        storyAPI.fetchStory(storyID).then(
            story => this.setState({
                story: story
            })
        )
    }
}

export default FullStory;