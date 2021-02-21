import React from 'react';
import {Form} from "react-bootstrap";
import {ProcessButton} from "../controls/ProcessButton";

export class InputBox extends React.Component {
    constructor(props)  {
        super(props);

        this.state = {
            hidePostButton: true,
        };
    }

    render() {

        return (
            <div className="mt-4">
                <Form.Control as="textarea"
                              rows={1}
                              placeholder="Say something..."
                              value={this.props.body}
                              onChange={event => this.props.onChange(event.target.value)}
                              onFocus={(event) => this.handleOnFocus(event.target.value)}
                              onBlur={(event) => this.handleOnBlur(event.target.value)}
                />
                <div className="d-flex justify-content-end mt-1">
                    <ProcessButton hide={this.state.hidePostButton}
                                   status={this.props.processingStatus}
                                   onClick={() => this.props.onPost()}
                                   disabled={this.props.body.length === 0}
                    >Post</ProcessButton>
                </div>
            </div>
        );
    }

    handleOnFocus(body) {
        if (!this.state.hidePostButton) return;

        this.setState({
            hidePostButton: false,
        });
    }

    handleOnBlur(body) {
        if (body.length === 0) {
            this.setState({
                hidePostButton: true,
            });
        }
    }
}
