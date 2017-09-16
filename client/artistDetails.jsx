import React from "react";
import ReactDOM from 'react-dom';

var Detail = React.createClass({

    getInitialState: function () {
        return {
            artist: "",
            topAlbum: "",
            entries: []
        };
    },

    componentDidMount: function () {
        $.get('/json/artist/The Killers', function (res) {
                var parsedRes = JSON.parse(res);
                var similarArtist = JSON.parse(parsedRes.similarArtistsList);
                var artist = parsedRes.artist;
                var topAlbum = parsedRes.artistTopAlbum;
                this.setState({artist, topAlbum, entries: similarArtist.nodes});
            }.bind(this)
        )
    },

    shouldComponentUpdate: function (artist) {
        this.state.artist = artist;
    },

    onFv: function () {
        $.get('/json/artist/Rihanna', function (res) {
            var parsedRes = JSON.parse(res);
            var similarArtist = JSON.parse(parsedRes.similarArtistsList);
            var artist = parsedRes.artist;
            var topTrack = parsedRes.artistTopAlbum;
            this.setState({artist, topAlbum, entries: similarArtist.nodes});
            }.bind(this)
        )
    },


    render() {
        return (
            <div>
                Előadó: {this.state.artist} <br />
                Legismertebb album: {this.state.topAlbum} <br />
                Hasonló előadók:
                <ul>
                    {this.state.entries.map(function (listValue) {
                        return <li key={listValue.id}>{listValue.id}</li>;
                    })}
                </ul>
            </div>
        )
    }
});

ReactDOM.render(<Detail />, document.getElementById('details'));
export default artistDetails;