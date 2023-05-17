import React from 'react';
import PropTypes from 'prop-types';
import { API_ENV } from 'fusion:environment';
import { HTMLLIBRE } from '../utils/subtypes/subtypeHelper';

const ScriptVideoPowaHTML = ({ subtype }) => {
    return subtype === HTMLLIBRE ? (
        <script
            async
            src={`https://lanacionar.video-player.arcpublishing.com/${API_ENV}/powaBoot.js`}
        />
    ) : (
        <></>
    );
};

ScriptVideoPowaHTML.propTypes = {
    subtype: PropTypes.string.isRequired
};

export default ScriptVideoPowaHTML;
