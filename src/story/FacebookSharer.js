import React from 'react';

class FacebookSharer extends React.Component {

    render() {
        const baseURL = "https://untoldstories.me";
        const URL = `${baseURL}${this.props.path}`;

        return (
            <div className="fb-share-button"
                 data-href={URL}
                 data-layout="button_count">
            </div>

        );
    }
}

export default FacebookSharer;