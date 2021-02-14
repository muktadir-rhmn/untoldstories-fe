import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import NewStory from "../story/NewStory";
import Story from "../story/Story";

class NewsFeed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Container className="p-0">
                <Row>
                    <Col md="3">
                        Left Side bar
                    </Col>
                    <Col md="6">
                        <NewStory globalContext={this.props.globalContext}/>
                        <Story/>


                    </Col>
                    <Col md="3">
                        Right Sidebar
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default NewsFeed;