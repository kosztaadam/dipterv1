import React from "react";
import ReactDOM from 'react-dom';
import artistDetails from 'artistDetails.react';

var ArtistGraph = React.createClass({

    getInitialState: function () {
        return {
            artist: ""
        };
    },

    getArtist() {
        $.get('/json/artist/' + this.state.artist, function (res) {
                var parsedRes = JSON.parse(res);
                var similarArtist = JSON.parse(parsedRes.similarArtistsList);
                console.log(similarArtist);
                Detail.shouldComponentUpdate(this.state.artist);
            }
        );
    },

    handleSubmit(event) {
        event.preventDefault();
        this.getArtist();
    },

    handleChange(event) {
        this.setState({artist: event.target.value});
    },

    render()
    {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.artist} onChange={this.handleChange} />
                </form>
            </div>
        )
    }
});

ReactDOM.render(<ArtistGraph />, document.getElementById('searchBar'));