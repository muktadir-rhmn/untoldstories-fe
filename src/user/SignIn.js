import React from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import userAPI from "../apis/UserAPI";
import userManager from "./UserManager";
import ProcessButton, {ProcessingButtonStatus} from "../controls/ProcessButton";

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
                            <ProcessButton status={this.state.processingStatus}
                                           onClick={() => this.signIn()}> Sign In </ProcessButton>
                        </Form>
                    </Col>
                </Row>

            </Container>
        );
    }

    signIn() {
        this.setState({processingStatus: ProcessingButtonStatus.PROCESSING});

        userAPI.signIn(this.state.userName.value, this.state.password.value)
            .then(res => {
                userManager.addSignInInfo(res.userID, res.userName, res.token);
                window.location.href = "/";
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
                });

            }).finally(
                () => this.setState({
                    processingStatus: ProcessingButtonStatus.IDLE
                })
            );
    }

}

export default SignIn;