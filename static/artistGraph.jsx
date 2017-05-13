import React from "react";
import ReactDOM from 'react-dom';

var ArtistGraph = React.createClass({

    getInitialState: function () {
        return {
            entries: []
        };
    },

    componentDidMount: function () {
        $.get('/json/artist/The Killers', function (res) {
                var parsedRes = JSON.parse(res);
                var similarArtist = JSON.parse(parsedRes.similarArtistsList);
                this.setState({entries: similarArtist.nodes});

                var embedCode = '<script type="text/javascript">var simart = JSON.stringify(' + parsedRes.similarArtistsList + ');renderGraph(simart, false, false); </script>';
                $('#svg').append(embedCode);
            }.bind(this)
        )
    },

    render()
    {
        return (
            <div>
                <svg width="500" height="500"></svg>
            </div>
        )
    }
});

ReactDOM.render(<ArtistGraph />, document.getElementById('svg'));




