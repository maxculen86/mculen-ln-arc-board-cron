import React from 'react';
import Proptypes from 'prop-types';

const VideoInfo = ({ title, date }) => {
    return (
        <section className="info-programa">
            <section className="meta-programa">
                <span className="fecha">{date}</span>
                <h1 className="titulo">{title}</h1>
            </section>
        </section>
    );
};

VideoInfo.propTypes = {
    title: Proptypes.string.isRequired,
    date: Proptypes.string.isRequired
};

export default VideoInfo;
