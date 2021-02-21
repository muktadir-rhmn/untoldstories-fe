import React from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import {userManager} from "./UserManager";
import {userAPI} from "../apis/UserAPI";
import {ProcessButton, ProcessingButtonStatus} from "../controls/ProcessButton";
import {Message, generateMessage, MessageType} from "../controls/Message";

export class SignUp extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {
            userName: {
                value: "",
                error: ""
            },
            password: {
                value: "",
                error: ""
            },
            combinedMessage: null,
            processingStatus: ProcessingButtonStatus.IDLE,
        };
    }

    render() {
        if (userManager.isSignedIn()) {
            window.location.href = "/";
            return "";
        }

        return (
            <Container>
                <Row>
                    <Col className="mx-auto text-center">
                        <h1>Sign Up</h1>
                        <Message message={this.state.combinedMessage}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col md="6" className="mx-auto">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>User Name</Form.Label>
                                <Form.Text className="text-muted">
                                    Only English letters and numbers
                                </Form.Text>
                                <Form.Control type="text" placeholder="User Name" value={this.state.userName.value}
                                              onChange={event => this.setState({userName : {value : event.target.value}})}/>
                                <Form.Text className="text-danger">
                                    {this.state.userName.error}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Text className="text-muted">
                                    At least 8 characters
                                </Form.Text>
                                <Form.Control type="password" placeholder="Password" value={this.state.password.value}
                                              onChange={event => this.setState({password : {value : event.target.value}})}/>
                                <Form.Text className="text-danger">
                                    {this.state.password.error}
                                </Form.Text>
                            </Form.Group>
                            <ProcessButton status={this.state.processingStatus}
                                           onClick={() => this.signUp()}> Sign Up </ProcessButton>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }

    signUp() {
        this.setState({processingStatus: ProcessingButtonStatus.PROCESSING});

        userAPI.signUp(this.state.userName.value, this.state.password.value)
            .then(() => {
                this.setState({
                    processingStatus: ProcessingButtonStatus.DONE,
                    combinedMessage: generateMessage(MessageType.SUCCESS, "Sign up successful. You may sign in now."),
                })
            })
            .catch(error => {
                if (error === null) return;

                this.setState({
                    userName: {
                        value: this.state.userName.value,
                        error: error.userName ? error.userName : "",
                    },
                    password: {
                        value: this.state.password.value,
                        error: error.password ? error.password : "",
                    },
                    combinedMessage: null,
                });

            }).finally(() => this.setState({
                processingStatus: ProcessingButtonStatus.IDLE,
            }));
    }
}
