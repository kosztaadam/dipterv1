import React, { Component } from 'react';

export default class Home extends Component {

    constructor (props) {
        super(props);
        // Set the videoList to empty array
        this.state = { videosList: [] };
    }

    componentDidMount () {
        // Calls GET /api/v1/videos to populate videosList
    }

    render () {
        const { videosList } = this.state;
        return (
            <main className="container" id="container">
                <VideosList videos={videosList} />
            </main>
        );
    }
}

