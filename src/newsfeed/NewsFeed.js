import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import NewStory from "../story/NewStory";
import ProcessButton, {ProcessingButtonStatus} from "../controls/ProcessButton";
import Story from "../story/Story";
import newsfeedAPI from "../apis/NewsFeedAPI";

class NewsFeed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stories: [],
            pageNo: -1,

            processingStatus: ProcessingButtonStatus.PROCESSING,
        };
    }

    componentDidMount() {
        this.fetchStories(0);
    }

    render() {
        const storiesUI = this.renderStoriesUI();

        return (
            <Container className="p-0">
                <Row>
                    <Col md="3">

                    </Col>
                    <Col md="6">
                        <NewStory/>

                        {storiesUI}

                        <div className="card">
                            <ProcessButton variant="success"
                                           status={this.state.processingStatus}
                                           hide={!this.state.hasMoreStories}
                                           onClick={() => this.fetchStories(this.state.pageNo + 1)}
                            >Load More</ProcessButton>
                        </div>
                    </Col>
                    <Col md="3">

                    </Col>
                </Row>
            </Container>
        );
    }

    renderStoriesUI() {
        const stories = this.state.stories;
        const storiesUI = [];

        for (let i = 0; i < stories.length; i++) {
            storiesUI.push(<Story key={stories[i].id} story={stories[i]}/>);
        }
        return storiesUI;
    }

    fetchStories(pageNo) {
        this.setState({
            processingStatus: ProcessingButtonStatus.PROCESSING,
        });

        newsfeedAPI.fetchStories(pageNo).then(
            res => this.setState({
                stories: this.state.stories.concat(res.stories),
                pageNo: pageNo,

                hasMoreStories: res.stories.length > 0,
            })
        ).finally(
            () => this.setState({
                processingStatus: ProcessingButtonStatus.IDLE,
            })
        )
    }
}

export default NewsFeed;