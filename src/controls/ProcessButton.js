import React from 'react';
import {Button, Spinner} from "react-bootstrap";

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

        if (this.props.isProcessing) {
            return <Button variant="info" disabled><Spinner animation="border" size="sm"/>{this.props.children}</Button>;
        } else {
            return <Button variant="info" onClick={event => this.props.onClick(event)} disabled={this.props.disabled}>{this.props.children}</Button>;
        }
    }
}

export default ProcessButton;