import React from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import userManager from "./UserManager";
import {userEndpoints} from "./UserEndpoints";
import notificationTypes from "../notifier/notificationTypes";
import ProcessButton from "../controls/ProcessButton";

class SignUp extends React.Component{
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
            isSignUpProcessing: false,
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
                            <ProcessButton onClick={even => this.signUp()} isProcessing={this.state.isSignUpProcessing}> Sign Up </ProcessButton>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }

    signUp() {
        this.setState({isSignUpProcessing: true});

        userEndpoints.signUp(this.state.userName.value, this.state.password.value)
            .then(res => {
                this.props.showNotification(notificationTypes.INFO, "SignUp Successful. You may sign in");
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
                    }
                });

            }).finally(() => this.setState({isSignUpProcessing: false}));
    }
}

export default SignUp;