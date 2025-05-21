import React from 'react';
import PropTypes from 'fusion:prop-types';

function JwPlayerHome({ playerId }) {
    return (
        <script
            defer
            src={`https://cdn.jwplayer.com/libraries/${playerId}.js`}
        />
    );
}

JwPlayerHome.propTypes = {
    playerId: PropTypes.string.isRequired
};

export default JwPlayerHome;
