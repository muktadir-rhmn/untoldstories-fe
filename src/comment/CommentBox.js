import React from 'react';
import {commentAPI} from "../apis/CommentAPI";
import {userManager} from "../user/UserManager";
import {InputBox} from "./InputBox";
import {ProcessingButtonStatus} from "../controls/ProcessButton";

class CommentBox extends React.Component {
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
                         onPost={() => this.postComment()}/>;
    }

    postComment() {
        const storyID = this.props.storyID;
        const body = this.state.body;

        this.setState({processingStatus: ProcessingButtonStatus.PROCESSING});

        commentAPI.add(storyID, body).then(
            res => {
                this.props.onComment(this.createComment(res.id, body));

                this.setState({
                    body: "",
                    processingStatus: ProcessingButtonStatus.DONE,
                });
            }
        ).catch(
            () => {
                this.setState({
                    processingStatus: ProcessingButtonStatus.FAILED,
                });
            }
        )
    }

    //create a comment as if sent from the server
    createComment(id, body) {
        const curTime = Math.round(Date.now() / 1000);
        const author = {
            id: userManager.getUserID(),
            userName: userManager.getUserName(),
        }

        return {
            id: id,
            author: author,
            body: body,
            cTime: curTime,
            mTime: curTime,
            replies: [],
        };
    }

    handleOnChange(body) {
        this.setState({
            body: body,
            processingStatus: ProcessingButtonStatus.IDLE,
        });
    }
}

export default CommentBox;