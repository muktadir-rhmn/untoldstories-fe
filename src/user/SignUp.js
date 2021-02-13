import React from 'react';
import {Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import userManager from "./UserManager";
import {userEndpoints} from "./UserEndpoints";
import notificationTypes from "../notifier/notificationTypes";

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

        let signUpButton;
        if (this.state.isSignUpProcessing) {
            signUpButton = <Button variant="info" disabled><Spinner animation="border" size="sm"/> Sign Up</Button>;
        } else {
            signUpButton = <Button variant="info" onClick={event => this.signup()}>Sign Up</Button>;
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
                            {signUpButton}
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }

    signup() {
        this.setState({isSignUpProcessing: true});

        userEndpoints.signUp(this.state.userName.value, this.state.password.value)
            .then(res => {
                this.props.showNotification(notificationTypes.INFO, "SignUp Successful. You may sign in");
            })
            .catch(error => {
                console.log("SingUp component: validation error: ", error);

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