import React from 'react';
import {Card, Col, Form} from "react-bootstrap";
import {ProcessButton, ProcessingButtonStatus} from "../controls/ProcessButton";
import {storyAPI} from "../apis/StoryAPI";

export class NewStory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            body: "",
            privacy: 1,
            disablePostButton: true,
            processingStatus: ProcessingButtonStatus.IDLE,
        };
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control as="textarea"
                                          placeholder="Get rid of your mental burdens..."
                                          value={this.state.body}
                                          onChange={event => this.handleStoryBoxChange(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Row className="float-right">
                            <Col xs="auto" className="my-1">
                                <Form.Control
                                    as="select"
                                    className="mr-sm-2"
                                    custom
                                    value={this.state.privacy}
                                    onChange={event => this.setState({privacy: parseInt(event.target.value)})}
                                >
                                    <option value="1">Public</option>
                                    <option value="2">Private</option>
                                </Form.Control>
                            </Col>
                            <Col xs="auto" className="my-1">
                                <ProcessButton
                                    onClick={() => this.postComment()}
                                    status={this.state.processingStatus}
                                    disabled={this.state.disablePostButton}>Post</ProcessButton>
                            </Col>
                        </Form.Row>
                    </Form>
                </Card.Body>
            </Card>
        );
    }

    postComment() {
        this.setState({processingStatus: ProcessingButtonStatus.PROCESSING});

        storyAPI.addNew(this.state.body, this.state.privacy).then(
                () => {
                this.setState({
                    processingStatus: ProcessingButtonStatus.DONE,
                    body: "",
                });
            }).catch(
                () => this.setState({processingStatus: ProcessingButtonStatus.FAILED})
        );
    }

    handleStoryBoxChange(newValue) {
        this.setState({
            body: newValue,
            disablePostButton: newValue.length === 0,
            processingStatus: ProcessingButtonStatus.IDLE,
        })
    }
}
