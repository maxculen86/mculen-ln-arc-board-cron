import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import scriptVideoValidator from './scriptVideoValidator';

const ComscoreVideo = props => {
    const { location, globalContent, deployment, contextPath } = props;
    const loadVideo = scriptVideoValidator(globalContent);

    return (
        location === 'body-top' &&
        loadVideo && (
            <>
                <script
                    defer
                    id="ComscoreVideo"
                    src={deployment(`${contextPath}/resources/js/comscore.js`)}
                />
            </>
        )
    );
};

export default Consumer(ComscoreVideo);

ComscoreVideo.PropTypes = {
    globalContent: PropTypes.shape({}).isRequired,
    location: PropTypes.string.isRequired
};
