import React from 'react';
import PropTypes from 'prop-types';
import ComTitle from '../../../common/com-title';

const PowerUpLiveBlog = ({ data = {} }) => {
    const { embed = {} } = data;
    const { config = {} } = embed;
    const { time = '', title = '' } = config;
    return <ComTitle tag="h2" size="--l" content={`${time} ${title}`} />;
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
