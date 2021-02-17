import React from 'react';

class FacebookSharer extends React.Component {

    render() {
        const baseURL = "https://untoldstories.me";
        const URL = `${baseURL}${this.props.path}`;

        return (
            <div className="fb-share-button" data-href={URL}
                 data-layout="button_count" data-size="large"><a target="_blank"
                                                                 href={`https://www.facebook.com/sharer/sharer.php?u=${URL}&amp;src=sdkpreparse`}
                                                                 className="fb-xfbml-parse-ignore">Share</a></div>
        );
    }
}

export default FacebookSharer;