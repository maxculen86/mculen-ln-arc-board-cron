import React from 'react';
import PropTypes from 'prop-types';

const ScriptSWG = ({ location, globalContent: { type } }) => {
    return location === 'body-bottom' && type === 'story' ? (
        <script
            async
            subscriptions-control="manual"
            src="https://news.google.com/swg/js/v1/swg.js"
        />
    ) : (
        <></>
    );
};

ScriptSWG.propTypes = {
    globalContent: PropTypes.shape({
        type: PropTypes.string
    }),
    location: PropTypes.string
};

ScriptSWG.defaultProps = {
    globalContent: {},
    location: ''
};
export default ScriptSWG;
