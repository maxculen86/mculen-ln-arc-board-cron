import React from 'react';
import Consumer from 'fusion:consumer';
import scriptVideoValidator from './scriptVideoValidator';

function ComscoreVideo(props) {
    const { location, globalContent, deployment, contextPath } = props;
    const loadVideo = scriptVideoValidator(globalContent);

    return (
        location === 'body-top' &&
        loadVideo && (
            <script
                defer
                id="ComscoreVideo"
                src={deployment(`${contextPath}/resources/js/comscore.js`)}
            />
        )
    );
}

export default Consumer(ComscoreVideo);
