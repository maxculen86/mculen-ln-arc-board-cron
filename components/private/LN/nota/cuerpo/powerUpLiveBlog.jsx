import React from 'react';
import PropTypes from 'prop-types';
import ComTitle from '../../../common/com-title';

const PowerUpLiveBlog = ({ data = {} }) => {
    const { embed = {} } = data;
    const { config = {} } = embed;
    const { time = '', title = '' } = config;

    const timeWithoutSeconds = (timeString = '') => {
        const timeArray = timeString.split(':');
        timeArray.length > 2 && timeArray.pop();
        return timeArray.join(':');
    };
    return (
        <ComTitle
            tag="h2"
            size="--l"
            content={`${timeWithoutSeconds(time)} ${title}`}
        />
    );
};

PowerUpLiveBlog.arcType = 'custom-liveblog';
PowerUpLiveBlog.isStatic = true;

PowerUpLiveBlog.propTypes = {
    data: PropTypes.shape({
        embed: PropTypes.shape({
            config: PropTypes.shape({
                time: PropTypes.string,
                title: PropTypes.string
            })
        })
    }).isRequired
};

export default PowerUpLiveBlog;
