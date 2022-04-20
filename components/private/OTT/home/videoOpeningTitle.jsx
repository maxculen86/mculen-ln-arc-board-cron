import React from 'react';
import PropTypes from 'prop-types';

const VideoOpeningTitle = ({ title }) => (
    <section>
        <h1 className="section-title">{title}</h1>
    </section>
);

VideoOpeningTitle.propTypes = {
    title: PropTypes.string.isRequired
};

export default VideoOpeningTitle;
