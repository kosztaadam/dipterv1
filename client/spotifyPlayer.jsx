import React from "react";
import ReactDOM from 'react-dom';

var Spotify = React.createClass({

    getInitialState: function () {
        return {
            iframe: ""
        };
    },

    componentDidMount: function () {
        $.get('/spotify', function (res) {
                console.log(res);
                //var parsedRes = JSON.parse(res);
                //var url = "https://embed.spotify.com/?uri=spotify:album:";
                this.setState({iframe : res});
            }.bind(this)
        )
    },

    iframe: function () {
        return {
            __html: this.state.iframe
        }
    },

    render() {
        return (
            <div>
                <div dangerouslySetInnerHTML={ this.iframe() } />
            </div>
        )
    }
});

ReactDOM.render(<Spotify />, document.getElementById('spotify'));