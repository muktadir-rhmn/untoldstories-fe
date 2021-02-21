import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "@reach/router";
import {userPaths} from "../user/UserPaths";

export class LandingPage extends React.Component {

    render() {
        return (
            <div>
                <Container fluid>
                    <Row className="text-center mb-5">
                        <Col>
                            <h1 >Get Rid of Your Mental Burdens</h1>
                            <h2 className="text-muted">Express yourself</h2>
                            <Link to={userPaths.signUp()} className="btn btn-lg btn-outline-success">Get Started</Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3" className="p-4 pl-5 bg-light">
                            <h2>Share Your Stories</h2>
                            <p>Share your stories to the world without disclosing your identity</p>
                            <p>Get advices from others</p>
                        </Col>
                        <Col md="3" className="p-4 pl-5 bg-light">
                            <h2>Journal Privately</h2>
                            <p>Write down what is going in your life and how you are feeling</p>
                            <p>Get rid of your negative emotions</p>
                            <p>No one else will see it</p>
                        </Col>
                        <Col md="3" className="p-4 pl-5 bg-light">
                            <h2>Read Others' Stories</h2>
                            <p>Read the untold stories that was not shared before</p>
                            <p>Share how you feel about them</p>
                        </Col>
                        <Col md="3" className="p-4 pl-5 bg-light">
                            <h2>Remain Anonymous</h2>
                            <p>Don't worry, we won't track you</p>
                            <p>We don't collect any personal information</p>
                            <p>Share with complete peace in mind</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
