import React from 'react';
import {Button, Card, Col, Form} from "react-bootstrap";
import ProcessButton from "../controls/ProcessButton";
import storyAPI from "../apis/StoryAPI";

class UpdateStory extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.initState(this.props.id, this.props.body, this.props.privacy);
    }

    initState(id, body, privacy) {
        this.setState({
            id: id,
            body: body,
            privacy: privacy,
            disablePostButton: false,
            isProcessingPost: false,
        })
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
                                    onClick={() => this.updateStory()}
                                    isProcessing={this.state.isProcessingPost}
                                    disabled={this.state.disablePostButton}>
                                    Update
                                </ProcessButton>
                                <Button variant="outline-success"
                                        onClick={() => this.props.onFinish(false)}>
                                    Cancel
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Card.Body>
            </Card>
        );
    }

    updateStory() {
        const storyID = this.state.id;
        const body = this.state.body;
        const privacy = this.state.privacy;

        storyAPI.update(storyID, body, privacy).then(
            () => this.props.onFinish(true, body, privacy)
        )
    }

    handleStoryBoxChange(newValue) {
        this.setState({
            body: newValue,
            disablePostButton: newValue.length === 0,
        })
    }
}

export default UpdateStory;