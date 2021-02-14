import React from 'react';
import {Button, Spinner} from "react-bootstrap";

class ProcessButton extends React.Component{

    render() {
        if (this.props.isProcessing) {
            return <Button variant="info" disabled><Spinner animation="border" size="sm"/>{this.props.children}</Button>;
        } else {
            return <Button variant="info" onClick={event => this.props.onClick(event)} disabled={this.props.disabled}>{this.props.children}</Button>;
        }
    }
}

export default ProcessButton;