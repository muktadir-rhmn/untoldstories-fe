import React from 'react';
import {Card} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faThumbsUp, faComment, faShare} from "@fortawesome/free-solid-svg-icons";
import "./style.css";

class Story extends React.Component{
    constructor(props)  {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Card className="mt-4">
                <Card.Body>
                    <Card.Title>Hosen Ali</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">1 February 2020</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Card.Text className="text-muted">1000 views</Card.Text>
                </Card.Body>
                <Card.Footer className="p-0">
                    <div className="d-flex justify-content-between">
                        <div className="action-button p-2 text-center" style={{width: '33%', color: 'gray'}}>
                            <a href="#" className="d-block"><FontAwesomeIcon icon={faThumbsUp} size="2x" color="gray"/> 100</a>
                        </div>
                        <div className="action-button p-2 text-center" style={{width: '33%'}}>
                            <a href="#" className="d-block"><FontAwesomeIcon icon={faComment} size="2x" color="gray"/> 100</a>
                        </div>
                        <div className="action-button p-2 text-center" style={{width: '33%'}}>
                            <a href="#" className="d-block"><FontAwesomeIcon icon={faShare} size="2x" color="gray"/> 100</a>
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        );
    }
}

export default Story;