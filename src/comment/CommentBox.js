import React from 'react';
import {Form} from "react-bootstrap";
import ProcessButton from "../controls/ProcessButton";
import commentAPI from "../apis/CommentAPI";
import userManager from "../user/UserManager";

class CommentBox extends React.Component {
    constructor(props)  {
        super(props);

        this.state = {
            body: "",
            isProcessing: false,
        };
    }

    render() {

        return (
            <div className="mt-2">
                <Form.Control as="textarea"
                              rows={1}
                              placeholder="Say something to make the author feel better..."
                              value={this.state.body}
                              onChange={event => this.setState({body: event.target.value})}
                />
                <div className="d-flex justify-content-end mt-1">
                    <ProcessButton isProcessing={this.state.isProcessing}
                                   onClick={() => this.postComment()}
                                   disabled={this.state.body.length === 0}
                    >Post</ProcessButton>
                </div>
            </div>
        );
    }

    postComment() {
        const storyID = this.props.storyID;
        const body = this.state.body;

        commentAPI.add(storyID, body).then(
            res => {
                this.props.onComment(this.createComment(res.id, body));

                this.setState({
                    body: "",
                });
            }
        );
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
}

export default CommentBox;