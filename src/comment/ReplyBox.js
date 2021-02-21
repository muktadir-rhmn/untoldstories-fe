import React from 'react';
import {InputBox} from "./InputBox";
import {replyAPI} from "../apis/ReplyAPI";
import {ProcessingButtonStatus} from "../controls/ProcessButton";

export class ReplyBox extends React.Component {
    constructor(props)  {
        super(props);

        this.state = {
            processingStatus: ProcessingButtonStatus.IDLE,
            body: "",
        }
    }

    render() {
        return <InputBox processingStatus={this.state.processingStatus}
                         body={this.state.body}
                         onChange={(body) => this.handleOnChange(body)}
                         onPost={() => this.postReply()}/>;
    }

    postReply() {
        const storyID = this.props.storyID;
        const commentID = this.props.commentID;
        const body = this.state.body;

        this.setState({processingStatus: ProcessingButtonStatus.PROCESSING});

        replyAPI.add(storyID, commentID, body).then(
            () => {
                this.setState({
                    body: "",
                    processingStatus: ProcessingButtonStatus.DONE,
                });
            }
        ).catch(
            () => {
                this.setState({processingStatus: ProcessingButtonStatus.FAILED});
            }
        );
    }

    handleOnChange(body){
        this.setState({
            body: body,
            processingStatus: ProcessingButtonStatus.IDLE,
        });
    }
}
