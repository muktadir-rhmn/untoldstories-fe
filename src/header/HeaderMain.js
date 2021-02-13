import React from 'react';
import {Button, Nav, Navbar} from "react-bootstrap";
import {Link} from "@reach/router";
import userManager from "../user/UserManager";
import userPaths from "../user/UserPaths";

class HeaderMain extends React.Component {
    constructor(props)  {
        super(props);

        this.state = {};
    }

    render() {
        let isSignedIn = userManager.isSignedIn();

        let rightPortion;
        if (isSignedIn)  {
            rightPortion = (
                <Nav className="mr-4">
                    <Button variant={"danger"} onClick={event => this.signOut()}>Sign Out</Button>
                </Nav>
            )
        } else {
            rightPortion = (
                <Nav className="mr-4">
                    <Link to={userPaths.signIn()} className="nav-link">Sign In</Link>
                    <Link to={userPaths.signUp()} className="btn btn-outline-success">Sign up</Link>
                </Nav>
            )
        }

        return (
            <Navbar bg="light" expand="lg" sticky="top">
                <Navbar.Brand href="/">Untold Stories</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/" className="nav-link">Home</Link>
                    </Nav>
                    {rightPortion}
                </Navbar.Collapse>
            </Navbar>
        );
    }

    signOut() {
        userManager.removeSignInInfo();
        window.location.href = userPaths.signIn();
    }
}

export default HeaderMain;