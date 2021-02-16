import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import NewStory from "../story/NewStory";

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

                    </Col>
                    <Col md="6">
                        <NewStory globalContext={this.props.globalContext}/>

                    </Col>
                    <Col md="3">

                    </Col>
                </Row>
            </Container>
        );
    }
}

export default NewsFeed;