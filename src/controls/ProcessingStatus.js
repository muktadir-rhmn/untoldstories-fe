import React from 'react';
import {Spinner} from "react-bootstrap";

class ProcessingStatus extends React.Component{
    render() {
        if (!this.props.isProcessing) return "";

        return (
            <div className="text-center" >
                <Spinner animation="border" />
            </div>
        )
    }
}

export default ProcessingStatus;