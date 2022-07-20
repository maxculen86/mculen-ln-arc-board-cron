import React from 'react';
import PropTypes from 'prop-types';
import ComTitle from '../../../common/com-title';
import StaticValidation from '../../../common/staticValidation';

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
        <StaticValidation>
            <ComTitle
                tag="h2"
                size="--l"
                content={`${timeWithoutSeconds(time)} ${title}`}
            />
        </StaticValidation>
    );
};

PowerUpLiveBlog.arcType = 'custom-liveblog';

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
