import React from 'react';
import {Button, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";

export const ProcessingButtonStatus = {
    IDLE: 0,
    PROCESSING: 1,
    DONE: 2,
    FAILED: 3,
}

/**
 * Props:
 *      - hide boolean: to control visibility
 *      - disabled boolean: to control disability
 *      - isProcessing boolean: to disable and show spinner while processing
 *      - onClick function: click handler
 */
class ProcessButton extends React.Component {

    render() {
        if (this.props.hide) return "";

        const status = this.props.status;
        if (status === ProcessingButtonStatus.IDLE) {
            return <Button variant="info"
                           onClick={event => this.props.onClick(event)}
                           disabled={this.props.disabled}
            >{this.props.children}</Button>;
        } else if (status === ProcessingButtonStatus.PROCESSING) {
            return <Button variant="info" disabled><Spinner animation="border" size="sm"/>{this.props.children}</Button>;
        } else if (status === ProcessingButtonStatus.DONE) {
            return <span style={{color: "rgb(4, 191, 53)", padding: "8px"}}><FontAwesomeIcon icon={faCheck} size="sm"/> Done</span>;
        } else if (status === ProcessingButtonStatus.FAILED) {
            return <span style={{color: "rgb(245, 71, 69)", padding: "8px"}}><FontAwesomeIcon icon={faTimes} size="sm"/> Failed</span>;
        }
    }
}

export default ProcessButton;