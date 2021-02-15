import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import ProcessingStatus from "../controls/ProcessingStatus";

class FullStory extends React.Component{
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Container className="p-0">
                <Row className="d-flex justify-content-center">
                    <Col md="6">
                        <ProcessingStatus isProcessing={this.state.isProcessing} />
                        {this.props.storyID}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default FullStory;