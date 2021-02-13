import React from 'react';
import {Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {userEndpoints} from "./UserEndpoints";
import userManager from "./UserManager";

class SignIn extends React.Component {
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
            isSignInProcessing: false,
        };
    }

    render() {
        if (userManager.isSignedIn()) {
            window.location.href = "/";
            return "";
        }

        let signInButton;
        if (this.state.isSignInProcessing) {
            signInButton = <Button variant="info" disabled><Spinner animation="border" size="sm"/> Sign In</Button>;
        } else {
            signInButton = <Button variant="info" onClick={event => this.signIn()}>Sign In</Button>;
        }

        return (
            <Container>
                <Row>
                    <Col className="mx-auto text-center">
                        <h1>Sign In</h1>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col md="6" className="mx-auto">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" placeholder="User Name" value={this.state.userName.value}
                                              onChange={event => this.setState({userName : {value : event.target.value}})}/>
                                <Form.Text className="text-danger">
                                    {this.state.userName.error}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"
                                              onChange={event => this.setState({password : {value : event.target.value}})}/>
                                <Form.Text className="text-danger">
                                    {this.state.password.error}
                                </Form.Text>
                            </Form.Group>
                            {signInButton}
                        </Form>
                    </Col>
                </Row>

            </Container>
        );
    }

    signIn() {
        this.setState({isSignInProcessing: true});
        userEndpoints.signIn(this.state.userName.value, this.state.password.value)
            .then(res => {
                userManager.addSignInInfo(res.userID, res.token);
                window.location.href = "/";
            })
            .catch(error => {
                console.log("SingIn component: validation error: ", error);

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

            }).finally(() => this.setState({isSignInProcessing: false}));
    }

}

export default SignIn;