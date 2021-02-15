import React from 'react';
import {Card, Col, Form} from "react-bootstrap";
import ProcessButton from "../controls/ProcessButton";
import storyAPI from "../apis/StoryAPI";
import notificationTypes from "../notifier/notificationTypes";

class NewStory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            body: "",
            privacy: 1,
            disablePostButton: true,
            isProcessingPost: false,
        };
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control as="textarea"
                                          placeholder="Express your mental burdens..."
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
                                    onClick={event => this.postStory()}
                                    isProcessing={this.state.isProcessingPost}
                                    disabled={this.state.disablePostButton}>Post</ProcessButton>
                            </Col>
                        </Form.Row>
                    </Form>
                </Card.Body>
            </Card>
        );
    }

    postStory() {
        this.setState({isProcessingPost: true});

        storyAPI.addNew(this.state.body, this.state.privacy)
            .then((res)=>{
                this.setState({
                    isProcessingPost: false,
                    body: "",
                });

                this.props.globalContext.showNotification(notificationTypes.SUCCESS, "Successfully posted...")
            }).catch((err) => this.setState({isProcessingPost: false}));
    }

    handleStoryBoxChange(newValue) {
        this.setState({
            body: newValue,
            disablePostButton: newValue.length === 0,
        })
    }
}

export default NewStory;